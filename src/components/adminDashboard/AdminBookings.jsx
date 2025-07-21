import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5; // Number of bookings per page

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:1990/mnb/api/getAllBookings');
      setBookings(res.data);
      toast.success('Bookings fetched successfully!');
    } catch (err) {
      console.error('Error fetching bookings:', err);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    try {
      setActionLoading(true);
      await axios.delete(`http://localhost:1990/mnb/api/deleteBooking/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
      toast.success('Booking deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete booking');
    } finally {
      setActionLoading(false);
    }
  };

  const startEdit = (booking) => {
    setEditingId(booking._id);
    setEditMessage(booking.message || '');
  };

  const updateBooking = async () => {
    try {
      setActionLoading(true);
      await axios.put(`http://localhost:1990/mnb/api/updateBooking/${editingId}`, {
        message: editMessage,
      });
      setBookings(bookings.map(b => b._id === editingId ? { ...b, message: editMessage } : b));
      setEditingId(null);
      toast.success('Booking updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update booking');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter bookings based on search
  const filteredBookings = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.service.toLowerCase().includes(search.toLowerCase()) ||
    new Date(b.dateTime).toLocaleDateString().includes(search)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / perPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#959A4A] mb-6 text-center">📋 All Bookings</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, service or date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#959A4A] text-white">
              <tr>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">File</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">No bookings found.</td>
                </tr>
              ) : paginatedBookings.map((b, idx) => (
                <tr key={b._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4">{b.service}</td>
                  <td className="py-2 px-4">{b.name}</td>
                  <td className="py-2 px-4">{b.email}</td>
                  <td className="py-2 px-4">{new Date(b.dateTime).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    {editingId === b._id ? (
                      <input
                        type="text"
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      b.message || <span className="text-gray-400 italic">No message</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {b.fileUrl ? (
                      <a
                        href={`http://localhost:1990/${b.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : <span className="text-gray-400">—</span>}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {editingId === b._id ? (
                        <>
                          <button
                            onClick={updateBooking}
                            disabled={actionLoading}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                          >
                            {actionLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(b)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            title="Edit message"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteBooking(b._id)}
                            disabled={actionLoading}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                            title="Delete booking"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1 ? 'bg-[#959A4A] text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
