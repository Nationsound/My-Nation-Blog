import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SeventhSection = () => {
  return (
    <div>
        
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-24 px-6 text-center relative overflow-hidden"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        WORK WITH <span className="text-primary">NATIONSOUND</span><br />
        AND GET THE BEST <span className="text-yellow-400">AFROSOUND</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mt-4 mb-8">
        Top-notch production, mixing, and mastering services tailored for Afrobeat artists.
      </p>

      <Link
        to="/booking"
        className="inline-block bg-primary hover:bg-violet-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
      >
        Book Now
      </Link>

      {/* Background Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-primary opacity-20 rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-violet-600 opacity-10 rounded-full bottom-10 right-10 animate-ping"></div>
      </div>
    </motion.div>
    </div>
  )
}

export default SeventhSection