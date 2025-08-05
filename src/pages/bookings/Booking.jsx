import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../utils/axios';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const services = [
  { title: 'Music Production', originalPrice: '₦300,000', promoPrice: '₦150,000', description: 'Get custom music production tailored to your style.' },
  { title: 'Instrumental', originalPrice: '₦150,000', promoPrice: '₦75,000', description: 'Purchase high-quality instrumentals for your songs.' },
  { title: 'Mixing', originalPrice: '₦100,000', promoPrice: '₦60,000', description: 'Professional mixing for a clean, radio-ready sound.' },
  { title: 'Mastering', originalPrice: '₦150,000', promoPrice: '₦80,000', description: 'Final polish to make your track stand out on all platforms.' },
  { title: 'Song Upload', originalPrice: '₦30,000', promoPrice: '₦15,000', description: 'Upload your unlimited songs for engagements and downloads.' },
  { title: 'Blog Posts', originalPrice: '₦25,000', promoPrice: '₦15,000', description: 'Upload your contents to reach max audience for engagements' },
  { title: 'Product Marketing', originalPrice: '₦100,000', promoPrice: '₦50,000', description: 'Strategy and implementation for promoting your products online.' },
  { title: 'Partnership Deal', originalPrice: '₦600,000', promoPrice: '₦200,000', description: 'Collaborative business opportunities to expand your market reach.' },
];

const Booking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    message: '',
    date: '',
    fileUrl: ''  // store Cloudinary URL here
  });

  const handleFileUpload = async (file) => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: data
      });

      const cloudData = await res.json();
      return cloudData.secure_url;
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      toast.error('Failed to upload file. Please try again.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        dateTime: formData.date,
        fileUrl: formData.fileUrl,
      };

      await api.post('/mnb/api/bookings', payload);

      toast.success('✅ Booking submitted successfully!');
      setFormData({
        service: '',
        name: '',
        email: '',
        message: '',
        date: '',
        fileUrl: ''
      });

      const selectedService = services.find(s => s.title === payload.service);
      navigate('/payment', { state: { service: selectedService } });
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('❌ Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const uploadedUrl = await handleFileUpload(file);
      if (uploadedUrl) {
        setFormData({ ...formData, fileUrl: uploadedUrl });
        toast.success('✅ File uploaded successfully');
      }
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 } },
  };

  const staggeredContainer = {
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8 text-[#959A4A]">Welcome To Our Booking Service</h1>
      <p className="font-bold text-center mb-8">Choose from all our available services below</p>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-12 px-2"
        variants={staggeredContainer} initial="hidden" animate="visible"
      >
        {services.map((service, index) => (
          <motion.div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            variants={cardVariants}>
            <h3 className="text-xl font-bold text-[#959A4A] mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p className="text-sm text-gray-500 mb-1">Original Price: <span className="line-through">{service.originalPrice}</span></p>
            <p className="text-lg font-semibold text-[#959A4A]">Promo: {service.promoPrice}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.form onSubmit={handleSubmit}
        className="space-y-4 bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      >
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input type="email" placeholder="Email Address" className="w-full border p-2 rounded" required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <select className="w-full border p-2 rounded" required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        >
          <option value="">Select Service</option>
          {services.map((service, index) => (
            <option key={index} value={service.title}>{service.title}</option>
          ))}
        </select>
        <textarea placeholder="Project Details" className="w-full border p-2 rounded" rows={4} required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <input type="file" className="w-full" accept="image/*,audio/*"
          onChange={handleFileChange}
        />
        <input type="datetime-local" className="w-full border p-2 rounded" required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <button type="submit" disabled={loading || !formData.fileUrl}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#959A4A] hover:bg-violet-600'} text-white py-2 rounded transition`}
        >
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </motion.form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Current date: April 22, 2025</p>
      </div>
    </div>
  );
};

export default Booking;
