import React, { useState, useEffect } from 'react';
import './FirstSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FirstSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveCard(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="class-one"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button className="arrow-button" onClick={() => setActiveCard(0)}>
        <FaArrowLeft size={20} />
      </button>
      <AnimatePresence mode="wait">
        {activeCard === 0 && (
          <motion.div
            key="card1"
            className="section-with-border"
            initial={{ opacity: 0, x: -100 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
          >
            <h1 className="section-title">Our Mission</h1>
            <p className="section-text">
              We render a service that champions your brand towards achieving the biggest dream in the global stage, i.e., making waves across the globe and enlightening the world with top-notch performances. We also embrace the desire to promote young and talented entertainers as well as help making their voices heard and their contents seen. We offer a blog service that enables you to share more information about your business and to broadcast your views, thoughts, and opinions about certain topics.
            </p>
            <div className="button-on-border">
              <Link to="/about" className="border-button">
                Learn More
              </Link>
            </div>
          </motion.div>
        )}

        {activeCard === 1 && (
          <motion.div
            key="card2"
            className="section-with-border"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
          >
            <h1 className="section-title">My Nation Blog: News, Style and Entertainment</h1>
            <p className="section-text">We provide you with updated news across all segments:</p>
            <ul className="section-list">
              <li>Education</li>
              <li>Politics</li>
              <li>Sport</li>
              <li>Entertainment</li>
              <li>Finance</li>
              <li>Agriculture</li>
              <li>Technology</li>
            </ul>
            <div className="button-on-border">
              <Link to="/about" className="border-button">
                Learn More
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="arrow-button" onClick={() => setActiveCard(1)}>
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default FirstSection;
