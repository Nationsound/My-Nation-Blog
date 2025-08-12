import React, { useState, useEffect } from "react";
import api from "../../../utils/axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("uploads/") ? path : `uploads/${path}`;
  return `${baseURL.replace(/\/$/, "")}/${normalized}`;
};

const WorkersForm = ({ selectedWorker, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    photo: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (selectedWorker) {
      setFormData({
        name: selectedWorker.name || "",
        role: selectedWorker.role || "",
        photo: null
      });
      setPreview(getImageUrl(selectedWorker.photo) || null);
    }
  }, [selectedWorker]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role) {
      return toast.error("Name and role are required");
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      setLoading(true);
      if (selectedWorker) {
        // Update worker
        await api.put(`/mnb/api/updateWorker/${selectedWorker._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Worker updated successfully");
      } else {
        // Create worker
        await api.post("/mnb/api/worker", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Worker created successfully");
      }
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving worker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {selectedWorker ? "Update Worker" : "Add Worker"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter worker's name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter worker's role"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover rounded"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-profile.png";
              }}
            />
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkersForm;
