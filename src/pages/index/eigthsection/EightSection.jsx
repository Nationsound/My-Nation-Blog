import React from 'react'
import './EightSection.css'
import myNationimg35 from '../../../assets/images/myNationimg35.jpg'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EightSection = () => {
  return (
    <div>
        <div className='why'>
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why My Nation Blog?
        </motion.h1>

        <motion.div
          className=""
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>We Build Brand Awareness</p>
          <p style={{ fontSize: '14px', marginTop: '5px' }}>
            My Nation Blog helps brands grow visibility through stylish content, news, and entertainment.
          </p>
        </motion.div>

        <motion.div
          className=""
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>Establish Credibility</p>
          <p style={{ fontSize: '14px', marginTop: '5px' }}>
            We position your brand as trustworthy with consistent and professional presentation.
          </p>
        </motion.div>

        <motion.div
          className=""
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <p>
            Artiste Management, Music Production <br />
            (Instrumental, Mixing & Mastering of Songs)
          </p>
          <p style={{ fontSize: '14px', marginTop: '5px' }}>
            We support talents with professional production, mixing, and branding strategies.
          </p>
        </motion.div>
      </div>

      <motion.div
        className='why-one'
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={myNationimg35} alt="" className="why-img" />
        <h6>We give your product a definite selling point</h6>
        <Link
        to="/booking"
        className="inline-block bg-primary hover:bg-violet-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
      >
        Book Now
      </Link>
      </motion.div>
    </div>
    </div>
  )
}

export default EightSection