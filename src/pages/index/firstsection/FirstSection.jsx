import React from 'react'
import './FirstSection.css'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FirstSection = () => {
  return (
    <div>
      <motion.div
      className="class-one"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      <motion.div
        className="class-two"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="class-two h1"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our Misson
        </motion.h1>

        <motion.p
          className="class-two p"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          We render a service that champions your brand towards
          achieving the biggest dream in the global stage,
          i.e., making waves across the globe and enlightening
          the world with top-notch performances. We also embrace the
          desire to promote young and talented entertainers as well as help
          making their voices heard and their contents seen. We offer a blog service
          that enables you to share more information
          about your business and to broadcast your views, thoughts, and opinions
          about certain topics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          >
          <Link
         to="/about"
         className="bg-[#959A4A] text-white w-32 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2"
        >
         Learn More
        </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.h1
            className="class-three"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            My Nation Blog: News, Style and Entertainment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            We provide you with updated news across all segments:
          </motion.p>

          <motion.ul
            className="class-four"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <li>Education</li>
            <li>Politics</li>
            <li>Sport</li>
            <li>Entertainment</li>
            <li>Finance</li>
            <li>Agriculture</li>
            <li>Technology</li>
          </motion.ul>

          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          >
          <Link
         to="/about"
         className="bg-[#959A4A] text-white w-32 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2"
        >
         Learn More
        </Link>
        </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>

    </div>
  )
}

export default FirstSection