import React, { useState } from 'react';
import api from '../../../utils/axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const SubscribeSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/mnb/api/subscribe', { email });
      toast.success('Subscribed successfully! Check your email 🎉');
      setEmail('');
      setShowModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to subscribe. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center py-10 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        🎉 Subscribe to Our Promo Offers & Updates!
      </h2>
      <p className="text-gray-600 mb-6">
        Be the first to know about amazing deals, updates and exclusive offers.
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#959A4A] text-white px-6 py-3 rounded hover:bg-violet-600 transition"
      >
        Subscribe Now
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Enter Your Email to Subscribe
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. you@example.com"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#959A4A]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#959A4A] text-white py-2 rounded hover:bg-violet-600 transition"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscribeSection;
