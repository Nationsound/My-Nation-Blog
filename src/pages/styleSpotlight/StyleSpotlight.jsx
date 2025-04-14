// StyleSpotlight.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const spotlightData = [
  {
    name: 'Tiwa Savage',
    image: '/images/tiwa.jpg',
    description: 'Rocked a bold African print gown with gold accessories.',
    category: 'Female',
    featured: true,
  },
  {
    name: 'Davido',
    image: '/images/davido.jpg',
    description: 'Styled in urban streetwear with custom sneakers.',
    category: 'Male',
    featured: false,
  },
  {
    name: 'Tems',
    image: '/images/tems.jpg',
    description: 'Elegant silk dress paired with traditional coral beads.',
    category: 'Female',
    featured: true,
  },
  // Add more as needed
];

const StyleSpotlight = () => {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredSpotlight = filter === 'All'
    ? spotlightData
    : spotlightData.filter((item) => item.category === filter);

  const totalPages = Math.ceil(filteredSpotlight.length / itemsPerPage);
  const paginatedData = filteredSpotlight.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-[#959A4A] mb-4">Style Spotlight</h1>

      {/* Filter + Nominate Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-5xl mx-auto mb-6">
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded p-2 text-gray-700"
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#959A4A] hover:bg-violet-600 text-white px-4 py-2 rounded"
        >
          Nominate an Artist
        </button>
      </div>

      {/* Spotlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {paginatedData.map((artist, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition"
          >
            <img src={artist.image} alt={artist.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#959A4A]">{artist.name}</h2>
              <p className="text-gray-600 mt-2">{artist.description}</p>
              {artist.featured && (
                <span className="inline-block mt-3 px-3 py-1 bg-violet-600 text-white text-xs rounded-full">
                  Weekly Spotlight
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-[#959A4A] font-semibold">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Nomination Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#959A4A]">Nominate an Artist</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Artist Name" className="w-full border p-2 rounded" required />
              <input type="text" placeholder="Category (Male/Female)" className="w-full border p-2 rounded" required />
              <input type="file" className="w-full border p-2 rounded" required />
              <textarea placeholder="Describe the style/outfit" className="w-full border p-2 rounded" rows={4} required />
              <button
                type="submit"
                className="w-full bg-[#959A4A] hover:bg-violet-600 text-white py-2 rounded"
              >
                Submit Nomination
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StyleSpotlight;
