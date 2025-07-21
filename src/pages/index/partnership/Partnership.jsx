import React, {useState} from 'react'
import './Partnership.css'
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Partnership = () => {
    const [showModal, setShowModal] = useState(false); 
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState('');
    
      const handleSubmit = async() => {
        if (!name || !email || !message) {
          toast.error('Please fill in all fields!');
          return;
        }
        try {
          const response = await fetch('http://localhost:1990/mnb/api/partnership', {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/json',
            },
            body: JSON.stringify({name, email, message})
          });
          if(!response.ok) {
            throw new Error('Failed to submit partnership request')
          }
        
        toast.success('Request submitted successfully!');
    
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
        setShowModal(false);
        } catch(error){
          toast.error('something went wrong, please try again later');
          console.error(error);
        }
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
    <div>
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
        
    </div>
  )
}

export default Partnership