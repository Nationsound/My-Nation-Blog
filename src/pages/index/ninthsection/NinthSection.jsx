import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NinthSection = () => {
  return (
    <div>
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2f2f2f] to-[#000000] text-white px-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Welcome to <span className="text-primary">My Nation Blog</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Dive into a world of news, entertainment, fashion, and more. Discover the weekly <strong>Style Spotlight</strong> and get inspired.
        </p>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link to="/style-spotlight">
            <button className="px-6 py-3 text-lg font-semibold rounded-2xl bg-[#959A4A] hover:bg-violet-600 transition-colors duration-300 shadow-lg">
              Explore Style Spotlight
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
    </div>
  )
}

export default NinthSection