import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
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
    e.preventDefault();
    setLoading(true);

    // Simulate async request
    setTimeout(() => {
      setLoading(false);
      navigate('/booking-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#959A4A]">Welcome To Our Booking Service</h1>
      <p className='font-bold text-center mb-8'>Available Service</p>

      {/* Styled Services Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-12 px-2">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-[#959A4A] mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p className="text-sm text-gray-500 mb-1">
              Original Price: <span className="line-through">{service.originalPrice}</span>
            </p>
            <p className="text-lg font-semibold text-[#959A4A]">Promo: {service.promoPrice}</p>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-lg">
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
          {services.map((service, index) => (
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
        <input 
          type="file" 
          className="w-full" 
        />
        <input 
          type="datetime-local" 
          className="w-full border p-2 rounded" 
          required 
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#959A4A] hover:bg-violet-600'} text-white py-2 rounded transition`}
        >
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
};

export default Booking;
