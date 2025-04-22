import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { serviceDatas } from '../../dommyData/serviceData';
import './Service.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theBestImg from '../../assets/images/theBestImg.png'


const ServiceCard = ({ title, content, categories, image, id }) => (
  <motion.div 
    className="service-card"
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.img 
      src={image} 
      alt={title}
      className="service-img"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}  
    />
    <div className="service-info">
      <h3>{title}</h3>
      <p>{content.length > 200 ? content.substring(0, 200) + '...' : content}</p>
      <h6 className="service-category">{categories}</h6>
      <Link to={`/service/${id}`} className="service-btn">
        Learn More
      </Link>
    </div>
  </motion.div>
);

export default function Service() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      toast.error('Please fill in all fields!');
      return;
    }
    toast.success('Request submitted successfully!');

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setShowModal(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="service-page">
      <section className="service-hero">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle">Explore what we offer at My Nation Blog</p>
        </motion.div>
      </section>

      <section className="service-intro">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          We Build Fast and Scalable Solutions
        </motion.h2>
        <p>
          At MNB, we design and build stunning user interfaces and robust backend systems to give your audience a seamless digital experience. From content automation to full-stack development, marketing, and UI/UX design — we've got you covered.
        </p>
      </section>

      <section className="service-list">
        {serviceDatas.map((data) => (
          <ServiceCard key={data.id} {...data} />
        ))}
      </section>

      <section className="service-promo">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          We're more than a blog. We help musicians grow, promote stylish fashion, and connect users with entertainment through a professional platform designed for impact.
        </motion.p>
      </section>

      <section className="service-partnership">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          We Offer Partnership
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          At My Nation Blog, we believe in collaboration and mutual growth. Whether you're a music artist, fashion brand, startup, or business looking to reach a wider audience — we’re open to working together.
        </motion.p>

        <motion.ul
          className="partnership-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {[
            "Promote your brand or music via our platform",
            "Get featured in our news or entertainment segments",
            "Reach a vibrant community of fans and followers",
            "Scale your presence with our marketing support",
            "Flexible collaboration terms based on your goals",
          ].map((item, index) => (
            <motion.li key={index} variants={itemVariants}>
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          className="partnership-btn"
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
        >
          Become a Partner
        </motion.button>
      </section>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)} // backdrop click to close
          >
            <motion.div
              className="modal"
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring" }}
              onClick={(e) => e.stopPropagation()} // prevent click bubbling to overlay
            >
              <h3>Partner With Us</h3>
              <p>Leave your details and we’ll reach out to you for collaboration opportunities.</p>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="modal-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="modal-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea 
                placeholder="Your Message or Proposal" 
                className="modal-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Send Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="best-coming-section relative overflow-hidden">
  <motion.h1
    className="best-coming-title gradient-text"
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    The Best That Is Coming
  </motion.h1>

  <motion.p
    className="best-coming-description"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 1 }}
  >
    Dive into the exclusive world of powerful lyrics and melodies that mark
    my songwriting signature. “The Best That Is Coming” isn’t just a jingle—it's
    a statement of inspiration, hope, and creativity. Featured in iconic sessions,
    it is the soul of many unforgettable records. Stay tuned for what's next.
  </motion.p>

  <motion.div
    className="best-coming-graphic"
    whileHover={{ scale: 1.05, rotate: 1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <img src={theBestImg} alt="The Best That Is Coming Graphic" />
  </motion.div>

  <motion.p
    className="best-coming-description"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 1 }}
  >
    A signature jingle, an identity, and a statement — this exclusive drop is
    our introduction to the soul of songwriting excellence.
  </motion.p>

       <Link
          to="/booking"
          className="inline-block bg-primary hover:bg-violet-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transition cursor-pointer"
        >
          Book Now
        </Link>

  <div className="background-animation"></div>
</div>

    </div>
  );
}
