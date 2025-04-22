import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PreHome.css';
import { useNavigate } from 'react-router-dom';

const PreHome = () => {
  const navigate = useNavigate();
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercent(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 300); // slight pause before fade
        setTimeout(() => navigate('/'), 1500); // redirect after fade
        return 100;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  const bubbles = [
    { left: '20%', size: 30, delay: 0 },
    { left: '50%', size: 20, delay: 1 },
    { left: '70%', size: 25, delay: 2 },
    { left: '35%', size: 15, delay: 1.5 },
    { left: '80%', size: 10, delay: 2.5 },
  ];

  return (
    <div className="pre-home-container">
      {/* Bubbles */}
      <div className="bubbles-container">
        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            className="bubble"
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
              position: 'absolute',
              bottom: '-100px',
            }}
            initial={{ y: 0, opacity: 0.1, scale: 1 }}
            animate={{ y: -1000, opacity: 0.3, scale: 1.3 }}
            transition={{
              duration: 15,
              delay: bubble.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* MNB Logo */}
      <motion.div
        className="mnb-text"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <p>WE Are Excited To Have You Here!</p>
      </motion.div>

      {/* Loading Percentage */}
      <motion.div
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>{loadingPercent}%</p>
      </motion.div>

      {/* Fade Transition Overlay */}
      <motion.div
        className="fade-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeOut ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
};

export default PreHome;
