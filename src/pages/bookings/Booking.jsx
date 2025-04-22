import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  // Music-related services for the top section
  {
    title: 'Music Production',
    originalPrice: '$300',
    promoPrice: '$199',
    description: 'Get custom music production tailored to your style.',
  },
  {
    title: 'Instrumental',
    originalPrice: '$150',
    promoPrice: '$99',
    description: 'Purchase high-quality instrumentals for your songs.',
  },
  {
    title: 'Mixing',
    originalPrice: '$200',
    promoPrice: '$129',
    description: 'Professional mixing for a clean, radio-ready sound.',
  },
  {
    title: 'Mastering',
    originalPrice: '$100',
    promoPrice: '$79',
    description: 'Final polish to make your track stand out on all platforms.',
  },

  // Additional services for the bottom section
  {
    title: 'UI Design',
    originalPrice: '$500',
    promoPrice: '$300',
    description: 'Professional frontend design for web applications with responsive layouts.',
  },
  {
    title: 'Backend Service',
    originalPrice: '$650',
    promoPrice: '$400',
    description: 'Server-side development including APIs, databases, and integration.',
  },
  {
    title: 'Product Marketing',
    originalPrice: '$450',
    promoPrice: '$250',
    description: 'Strategy and implementation for promoting your products online.',
  },
  {
    title: 'Partnership Deal',
    originalPrice: '$800',
    promoPrice: '$500',
    description: 'Collaborative business opportunities to expand your market reach.',
  },
];

const Booking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);  // Simulate loading state
    const selectedService = services.find(service => service.title === formData.service);
    handleBookNow(selectedService); // Pass the selected service
  };
  

  // Service card variants for animation
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  // Staggered animation container for the service cards
  const staggeredContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

const handleBookNow = (service) => {
  navigate('/payment', { state: { service } }); // Send service data
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#959A4A]">Welcome To Our Booking Service</h1>
      <p className="font-bold text-center mb-8">Available Music Services</p>

      {/* Styled Music Services Grid with Animation */}
      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-12 px-2"
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
      >
        {services.slice(0, 4).map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            variants={cardVariants}
          >
            <h3 className="text-xl font-bold text-[#959A4A] mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p className="text-sm text-gray-500 mb-1">
              Original Price: <span className="line-through">{service.originalPrice}</span>
            </p>
            <p className="text-lg font-semibold text-[#959A4A]">Promo: {service.promoPrice}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Booking Form with Animation */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <select
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          value={formData.service}
        >
          <option value="">Select Service</option>
          {services.slice(0, 4).map((service, index) => (
            <option key={index} value={service.title}>{service.title}</option>
          ))}
        </select>
        <textarea
          placeholder="Project Details"
          className="w-full border p-2 rounded"
          rows={4}
          required
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <input type="file" className="w-full" />
        <input
          type="datetime-local"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#959A4A] hover:bg-violet-600'} text-white py-2 rounded transition`}
          onClick={() => handleBookNow(service)}
        >
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </motion.form>

      <motion.div
        className="max-w-4xl mx-auto p-4 mt-12"
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-[#222222] mb-2">Book Our IT Services</h2>
        <p className="text-[#AEAEAE] mb-6">Select the services you need for your business or personal projects.</p>

        {/* Styled Additional Services Grid with Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggeredContainer}
          initial="hidden"
          animate="visible"
        >
          {services.slice(4).map((service, index) => (
            <motion.div
              key={index}
              className="service-card p-6 border rounded-lg shadow-lg bg-white"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{service.description}</p>
              <p className="text-lg text-[#FD4A09] mb-2">Promo Price: {service.promoPrice}</p>
              <p className="text-lg text-gray-500 mb-2">Original Price: {service.originalPrice}</p>
              <button
            className="bg-[#FD4A09] text-white font-semibold py-2 px-4 rounded mt-4"
            onClick={() => handleBookNow(service)} // Passing the service to handleBookNow
            >
            Book Now
          </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="mt-8">
        <p className="text-sm text-gray-500">Current date: April 22, 2025</p>
      </div>
    </div>
  );
};

export default Booking;
