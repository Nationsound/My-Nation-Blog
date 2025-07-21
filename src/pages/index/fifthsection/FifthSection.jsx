import React from 'react'
import './FifthSection.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const FifthSection = () => {
  return (
    <div>
        <motion.div 
      className='brandnew'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div 
        className='brand-phase' 
        initial={{ scale: 0.95 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Ready To Promote Your Brand?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Reach out to us today and let's get started
        </motion.p>

        <motion.div 
          className='brand-btn'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link 
            to={'/about'} 
            className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2 
            sm:w-40 sm:px-6 sm:py-3 sm:text-base md:w-48 md:px-8 md:py-4 md:text-lg"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
  )
}

export default FifthSection