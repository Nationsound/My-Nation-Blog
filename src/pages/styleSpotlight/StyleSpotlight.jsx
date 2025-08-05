import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const StyleSpotlight = () => {
  const [spotlights, setSpotlights] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchSpotlights();
  }, []);

  const fetchSpotlights = async () => {
    try {
      const res = await api.get('/mnb/api/getAllSpotlights');
      setSpotlights(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to fetch spotlights');
    }
  };

  // Normalize image URL directly (no reusable import)
  const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${baseURL.replace(/\/$/, '')}/${image.replace(/^\/+/, '')}`;
};


  const filtered = filter === 'All'
    ? spotlights
    : spotlights.filter(item => item.category.toLowerCase() === filter.toLowerCase());

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-[#959A4A] mb-6">Style Spotlight</h1>

      {/* Filter */}
      <div className="flex justify-center mb-6">
        <select
          onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
          className="border rounded p-2 text-gray-700"
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Spotlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {paginatedData.map((artist, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={getImageUrl(artist.image)}
              alt={artist.name}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#959A4A]">{artist.name}</h2>
              <p className="text-gray-600 mt-2">{artist.description}</p>
              {artist.featured && (
                <span className="inline-block mt-3 px-3 py-1 bg-violet-600 text-white text-xs rounded-full">
                  Weekly Spotlight
                </span>
              )}
              <div className="flex items-center mt-3">
                <span className="text-yellow-500">⭐⭐⭐⭐</span>
                <span className="ml-2 text-gray-600 text-sm">
                  {artist.rating ? artist.rating.toFixed(1) : '4.0'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Prev
          </button>
          <span className="text-[#959A4A]">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StyleSpotlight;
