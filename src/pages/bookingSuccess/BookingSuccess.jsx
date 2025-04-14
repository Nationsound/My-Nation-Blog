import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-violet-100 px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl text-center">
        <h1 className="text-4xl font-bold text-[#959A4A] mb-4">Booking Successful! 🎉</h1>
        <p className="text-lg mb-6 text-gray-700">Thank you for trusting Nationsound with your projects. We’ll be in touch soon!</p>
        
        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/"
            className="bg-[#959A4A] hover:bg-violet-600 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Home
          </Link>
          <Link
            to="/booking"
            className="bg-violet-600 hover:bg-[#959A4A] text-white px-6 py-2 rounded-lg transition"
          >
            Book Another Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
