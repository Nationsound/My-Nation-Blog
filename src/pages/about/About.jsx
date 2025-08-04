import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { aboutDatas } from '../../dommyData/aboutData';
import myNationimg34 from '../../assets/images/myNationImg34.jpg';
import Nationsound from '../../assets/images/Nationsound.png';
import { FaUsers, FaCheckCircle, FaUserTie, FaClock, FaLightbulb, FaBullhorn, FaChartLine,FaRocket  } from 'react-icons/fa';

const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};

const About = ()=> {
  return (
    <div>
      {/* About Header Section */}
      <div className='about'>
        <div className='about-a'>
          <h1>About Us</h1>
        </div>
        <div className='about-b'>
          <Link to="/" className="about-b-home">Home</Link>
          <h6>About <span>us</span></h6>
        </div>
      </div>

      <motion.div 
      className="content" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h1>We offer several benefits for our customers or clients</h1>

      <div className="content-a">
        <motion.div 
          className="content-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <FaBullhorn size={32} color="#959A4A" />
          <h4>We Create Brand Awareness</h4>
          <p>We help build brand awareness and create customer loyalty.</p> 
        </motion.div>

        <motion.div 
          className="content-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <FaLightbulb size={32} color="#959A4A" />
          <h4>Establishing Leadership</h4>
          <p>Showcase your knowledge and establish your business as a leader with a loyal audience.</p>
        </motion.div>

        <motion.div 
          className="content-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <FaChartLine size={32} color="#959A4A" />
          <h4>Content Marketing</h4>
          <p>Use blogs as a powerful marketing tool to connect with your audience and grow.</p>
        </motion.div>

        <motion.div 
          className="content-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <FaRocket size={32} color="#959A4A" />
          <h4>New Opportunities</h4>
          <p>Create product awareness and open up growth opportunities with your blog presence.</p>
        </motion.div>
      </div>
    </motion.div>

    <div className="content-b">
      <h2>My Nation Blog: News, Style and Entertainment</h2> 
      
      <div className="content-c">
        {/* Animated Image */}
        <motion.div
          className="image-wrapper"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={myNationimg34} alt="My Nation Blog" className="about-d-img" />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="content-d"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div>
            <FaUsers className="icon" />
            <h3><CountUp end={100} duration={3} /> +</h3>
            <p>. Active Members</p>
          </div>
          <div>
            <FaCheckCircle className="icon" />
            <h3><CountUp end={50} duration={3} /> +</h3>
            <p>. Projects Executed</p>
          </div>
          <div>
            <FaUserTie className="icon" />
            <h3><CountUp end={25} duration={3} /> +</h3>
            <p>. Team Advisors</p>
          </div>
          <div>
            <FaClock className="icon" />
            <h3><CountUp end={20} duration={3} /> +</h3>
            <p>. Fulfilling Years</p>
          </div>
        </motion.div>
      </div>

      {/* Final Message */}
      <div className="content-e">
        <h4>We help businesses attract new customers excellently</h4>
      </div>
    </div>

      {/* Sound Section */}
<div className='nationsound'>
  <motion.div
    className="nationsound-text"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <h2>Discover the Sound of the Nation</h2>
    <p>Immerse yourself in our latest tracks and find your rhythm.</p>
    <Link to={'/booking'} className="cta-button">
      Explore More
    </Link>
  </motion.div>
  <motion.img
    src={Nationsound}
    alt="Nation Sound"
    className="nationsound-img"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
  />
</div>
<div className='brand'>
            <motion.div 
                className='brand-div-1'
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1>We Write Blog Posts To Educate Our Audience And Promote Your Brand</h1>
                <p>
                    We use social media platforms to engage with followers, share content, and run contests,
                    creating shareable content to reach a wider audience and maintain a consistent customer
                    experience across all touchpoints.
                </p>
            </motion.div>
        </div>
      {/* Blog Data Section */}
      <div>
        {aboutDatas.map((aboutData) => {
          const truncatedContent = truncate(aboutData.content, 75); 
          return (
            <motion.div
        key={aboutData.id}
        className="my-about"
        initial={{ opacity: 0, y: 50 }} // Initial state
        animate={{ opacity: 1, y: 0 }} // Final state
        transition={{ duration: 0.8 }} // Transition duration
      >
        <motion.h2
          className='my-about-b'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {aboutData.title}
        </motion.h2>

        <motion.div
          className="my-about-image-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img 
            src={aboutData.image} 
            alt={aboutData.title} 
            className="my-image" 
          />
        </motion.div>

        <motion.h5
          className="my-about-categories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {aboutData.categories}
        </motion.h5>

        <motion.p
          className="my-about-p"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {truncatedContent}
        </motion.p>

        <motion.div
          className="my-about-button-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Link to={`/about/${aboutData.id}`} className="my-about-button">
            Learn More
          </Link>
        </motion.div>
      </motion.div>
          );
        })}
      </div> 
    </div> 
  );
}
export default About;
