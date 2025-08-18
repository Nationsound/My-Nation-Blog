// components/admin/DeleteSpotlightComment.jsx
import React from "react";
import api from "../../../utils/axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const DeleteSpotlightComment = ({ commentId, onDeleted, onAllDeleted }) => {
  // ✅ Delete a single comment
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment and all its replies?")) return;

    try {
      await api.delete(`${baseURL}/mnb/api/style-spotlight/comment/${commentId}`);
      toast.success("Comment deleted successfully");
      if (onDeleted) onDeleted(commentId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  };

  // ✅ Delete all comments
  const handleDeleteAll = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete ALL comments? This cannot be undone.")) return;

    try {
      await api.delete(`${baseURL}/mnb/api/style-spotlight/comments`);
      toast.success("All comments deleted successfully");
      if (onAllDeleted) onAllDeleted();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete all comments");
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Delete single comment */}
      <div className="flex flex-col items-start space-y-2">
        <h3 className="text-red-600 font-semibold text-sm">Delete Comment</h3>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
        >
          Delete
        </button>
      </div>

      {/* Delete all comments */}
      <div className="flex flex-col items-start space-y-2">
        <h3 className="text-red-800 font-semibold text-sm">Delete All Comments</h3>
        <button
          onClick={handleDeleteAll}
          className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded-md text-sm"
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default DeleteSpotlightComment;
