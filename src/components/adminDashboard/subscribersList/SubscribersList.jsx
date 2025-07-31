import React, { useEffect, useState } from "react";
import api from "../../../utils/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promo, setPromo] = useState({ subject: "", message: "" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(subscribers.length / perPage);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await api.get("/mnb/api/subscribers");
      setSubscribers(res.data);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = currentSubscribers.map((s) => s._id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      // Deselect all visible
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      // Select all visible
      setSelectedIds((prev) => [...prev, ...visibleIds.filter((id) => !prev.includes(id))]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      try {
        await api.delete(`/mnb/api/subscribers/${id}`);
        toast.success("Subscriber removed");
        fetchSubscribers();
      } catch (error) {
        toast.error("Failed to remove subscriber");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm("Delete selected subscribers?")) {
      try {
        for (const id of selectedIds) {
          await api.delete(`/mnb/api/subscribers/${id}`);
        }
        toast.success("Selected subscribers deleted");
        setSelectedIds([]);
        fetchSubscribers();
      } catch (error) {
        toast.error("Failed to delete selected subscribers");
      }
    }
  };

  const handleSendPromo = async () => {
    if (!promo.subject || !promo.message) {
      return toast.error("Subject and message are required");
    }
    try {
      await api.post("/mnb/api/send-promo", {
        subject: promo.subject,
        message: promo.message,
        html: `<p>${promo.message}</p>`,
        subscriberIds: selectedIds,
      });
      toast.success("Promo emails sent!");
      setPromo({ subject: "", message: "" });
      setSelectedIds([]);
    } catch (error) {
      toast.error("Failed to send promo emails");
    }
  };

  // Get visible subscribers based on pagination
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentSubscribers = subscribers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-[#959A4A]">
        Newsletter Subscribers
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-center text-gray-500">No subscribers yet.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              disabled={selectedIds.length === 0}
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Delete Selected
            </button>

            <button
              onClick={handleSelectAll}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              {currentSubscribers.every((s) => selectedIds.includes(s._id))
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <div className="grid gap-4">
            {currentSubscribers.map((subscriber) => (
              <motion.div
                key={subscriber._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(subscriber._id)}
                    onChange={() => handleSelect(subscriber._id)}
                  />
                  <div>
                    <p className="font-medium">{subscriber.email}</p>
                    <p className="text-xs text-gray-500">
                      Subscribed on:{" "}
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(subscriber._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Promo email form */}
          {selectedIds.length > 0 && (
            <div className="mt-6 border p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Send Promo Email</h3>
              <input
                type="text"
                placeholder="Subject"
                value={promo.subject}
                onChange={(e) => setPromo({ ...promo, subject: e.target.value })}
                className="w-full mb-2 px-3 py-1 border rounded"
              />
              <textarea
                placeholder="Message"
                value={promo.message}
                onChange={(e) => setPromo({ ...promo, message: e.target.value })}
                className="w-full mb-2 px-3 py-1 border rounded"
              />
              <button
                onClick={handleSendPromo}
                className="bg-[#959A4A] text-white px-4 py-1 rounded hover:bg-violet-600"
              >
                Send Promo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SubscribersList;
