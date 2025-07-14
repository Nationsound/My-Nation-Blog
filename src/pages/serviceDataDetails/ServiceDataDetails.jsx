import React from 'react'
import './ServiceDataDetails.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { serviceDatas } from '../../dommyData/serviceData';
import mbbImage from '../../assets/images/mbbImage.jpg';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';



const teamMembers = [
    {
      name: 'Olusola Adebayo Oguntuase',
      role: 'Chief Executive Officer',
      image: '/managementImage/mnbImg2.png',
      linkedin: 'https://www.linkedin.com/in/olusola-oguntuase-779069353/',
      twitter: 'https://x.com/MNBlog25',
      instagram: 'https://www.instagram.com/phonkey_n/',
      quote: 'Empowering ideas to shape the future.',
    },
    {
      name: 'Olusola Adebayo Oguntuase',
      role: 'Chief Technology Officer',
      image: '/managementImage/mnbImg3.png',
      linkedin: 'https://www.linkedin.com/in/olusola-oguntuase-779069353/',
      twitter: 'https://x.com/MNBlog25',
      instagram: 'https://www.instagram.com/phonkey_n/',
      quote: 'Technology is best when it brings people together.',
    },
    {
      name: 'Oluwadamilola Adebayo',
      role: 'Head of Marketing',
      image: '/managementImage/managementImg1.jpg',
      linkedin: 'https://linkedin.com/in/charlielee',
      twitter: 'https://twitter.com/charlielee',
      instagram: 'https://instagram.com/charlielee',
      quote: 'Creativity fuels the culture that builds brands.',
    },
  ];
  
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };
  

    const ServiceDataDetails = ()=> {
    const { id } = useParams();
    const serviceDataDetail = serviceDatas.find((p) => p.id === parseInt(id));

    if (!serviceDataDetail) return <div>Service details not found</div>;
    return (
        <div>
            <div className='service-a'>
                <div className='service-b'>
                    <h1>Service</h1>
                </div>
                <div className='service-c'>
                    <Link to="/" className="service-c-home">Home</Link>
                    <h6>Service</h6>
                </div>
            </div>


            <motion.div
      className="service"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="my-service"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        {serviceDataDetail.title}
      </motion.h2>
      <motion.img
        src={serviceDataDetail.image}
        alt={serviceDataDetail.i}
        className="my-image"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.h5
        className="my-service-categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {serviceDataDetail.categories}
      </motion.h5>
      <motion.p
        className="my-service-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        {serviceDataDetail.content}
      </motion.p>
      </motion.div>
            <div>
            <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="mbb-container"
             >
            <img
             src={mbbImage}
             alt="Music Brain Box Graphic"
             className="mbb-image"
             />
            <div className="mbb-text-content">
            <h2 className="mbb-title">Music Brain Box (MBB)</h2>
            <p className="mbb-description">
               Introducing <strong>Music Brain Box</strong> — the sonic hub where ideas are sculpted into sound perfection.
               Whether it's mixing, mastering, or both, MBB ensures every track hits with clarity, balance, and emotion. 🎧
            </p>
            <p className="mbb-subtext">
               Perfect your sound. Elevate your vibe. MBB got you covered.
            </p>
            </div>
             </motion.div> 
            </div>
            <div className="header">
                <h2>My Nation Blog: News, Style and Entertainment</h2>
                <h6>News, style & Entertainment</h6>
            </div>
            <section className="management-section">
               <h2 className="management-title">Meet Our Management Team</h2>
            <div className="team-grid">
             {teamMembers.map((member, index) => (
              <motion.div
              className="team-card"
              key={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <img src={member.image} alt={member.name} className="team-image" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <div className="social-links">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="social-icon" />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="social-icon" />
                </a>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="social-icon" />
                </a>
              </div>
            
              {/* Overlay content */}
              <div className="card-overlay">
                <p className="overlay-text">
                  {member.quote || "Leading with passion, driven by innovation."}
                </p>
              </div>
            </motion.div>
            
        ))}
      </div>
    </section>
        </div>
    )
}
export default ServiceDataDetails;
