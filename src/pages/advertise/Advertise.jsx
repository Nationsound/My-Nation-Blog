import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Advertise = () => {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdverts();
  }, []);

  const fetchAdverts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/mnb/api/getAdverts'); // ✅ correct endpoint
      setAdverts(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load adverts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#f9fafb] to-[#fff] min-h-screen">
      {/* Hero Banner */}
      <motion.div
        className="relative bg-[#959A4A] text-white py-20 md:py-28 text-center overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background pattern (optional circles or waves) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle at top left,rgba(255,255,255,0.15),transparent)]"></div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner With Us & Advertise Your Brand</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Show your products and services to thousands of daily visitors on My Nation Blog.
        </p>
        <motion.a
          href="/contact" // change to your real advert booking page
          className="inline-block bg-white text-[#959A4A] hover:bg-violet-600 hover:text-white font-semibold px-6 py-3 rounded transition"
          whileHover={{ scale: 1.05 }}
        >
          Advertise Now
        </motion.a>
      </motion.div>

      <div className="px-4 py-12 max-w-6xl mx-auto">
        {message && (
          <motion.p className="text-red-600 mb-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {message}
          </motion.p>
        )}

        {loading && (
          <motion.p className="text-gray-500 mb-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Loading adverts...
          </motion.p>
        )}

        <div className="space-y-12">
          {adverts.map((advert, index) => (
            <motion.div
              key={advert._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {advert.imageUrl && (
                <img
                  src={`${baseURL}/uploads/${advert.imageUrl}`}
                  alt={advert.title}
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
              )}
              <div className="p-6 md:p-8">
                <h4 className="text-3xl md:text-4xl font-semibold text-[#333] mb-4">{advert.title}</h4>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{advert.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  {advert.link && (
                    <a
                      href={advert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#959A4A] hover:bg-violet-600 text-white px-5 py-2 rounded transition-colors"
                    >
                      Visit Partner Site Here
                    </a>
                  )}

                  <div className="flex gap-4 text-[#959A4A] text-2xl">
                    {advert.facebook && (
                      <a href={advert.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="hover:text-violet-600 transition-colors" />
                      </a>
                    )}
                    {advert.twitter && (
                      <a href={advert.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="hover:text-violet-600 transition-colors" />
                      </a>
                    )}
                    {advert.instagram && (
                      <a href={advert.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="hover:text-violet-600 transition-colors" />
                      </a>
                    )}
                    {advert.linkedin && (
                      <a href={advert.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn className="hover:text-violet-600 transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertise;
