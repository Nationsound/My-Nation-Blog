import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import myNationimg38 from '../../assets/images/myNationimg38.jpg'
import myNationimg74 from '../../assets/images/myNationimg74.jpeg'
import myNationimg75 from '../../assets/images/myNationimg75.jpeg'
import myNationimg76 from '../../assets/images/myNationimg76.jpeg'
import myNationimg77 from '../../assets/images/myNationimg77.jpeg'
import myNationimg43 from '../../assets/images/myNationimg43.jpg'
import myNationimg40 from '../../assets/images/myNationimg40.jpg'
import myNationimg35 from '../../assets/images/myNationimg35.jpg'
import myNationimg49 from '../../assets/images/myNationimg49.jpg'
import { SiYoutube, SiSpotify, SiApplemusic, SiAudiomack } from "react-icons/si";
import { FaMusic } from "react-icons/fa";



export default function Home() {
  return (
    <div className="home">
      <div className="slideshow">
        <h2 className='EXP'>AN EXPERIENCE THAT EXTENDS BEYOND BLOG</h2>
        <h1>Welcome to MyNation Blog</h1>

      </div>
      <div className="home-page-c">
        <img src={myNationimg38} alt="" className="my-image rounded lg overflow-hidden " />

        <div className='home-page-d'>
          <h1 className="">About Us</h1>
          <p className="">We render a service that champions your brand towards <br />
            achieving the biggest dream in the global stage, <br />
            i:e making waves across the globe and enlightening <br />
            the world with top notch performances. we also embrace the <br />
            desire to promote young and talented entertainers as well as help <br />
            making their voices heard and their contents seen.We offer a blog service <br />
            that enables you to share more information <br />
            about your business and to broadcast your views, thoughts and opinion <br />
            about certain topics.
          </p>
          <Link to={'/about'} className="bg-[#959A4A] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>

          <div>
            <h1 className="my-home-5">My Nation Blog: News, Style and Entertainment</h1>
            <p>We provide you with updated news across all segments:</p>
            <ul className='my-home-5a'>
              <li>Education</li>
              <li>Politics</li>
              <li>Sport</li>
              <li>Entertainment</li>
              <li>Finance</li>
              <li>Agriculture</li>
              <li>Technology</li>
            </ul>
            <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>
          </div>
        </div>
      </div>
      <div className="hero-section">
      <div className="hero-top">
         <h1> My Nation Blog</h1>
           <svg className="hero-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
             <polygon fill="#5b3889" points="0,0 100,0 100,100" />
           </svg>
      </div>

      <div className="hero-middle">
         <h1>News, Style and Entertainment</h1>
           <img src={myNationimg40} alt="My Nation Logo" className="hero-image" />
      </div>

      <div className="hero-bottom">
           <img src={myNationimg43} alt="Style Preview" className="hero-image" />
           <svg className="hero-svg flip" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
             <polygon fill="#5b3889" points="0,0 100,0 100,100" />
           </svg>
      </div>
      </div>
      
      <div className='my-home-biz'>
        <div>
          <h3 className='my-home-3b'>// Our Service</h3>
        </div>
        <div className='my-home-3a'>
          <h1>We Help Promote Your Business, and <br />Make Your Brand <br />Known To The World</h1>
        </div>
        <h3 className='my-home-3b'>A platform that enhances music promotion, upgrades rising talents <br />
          and provides adequate information about daily trends.</h3>
        <div className='my-home-3c'>
          <p className="my-home-3">Our blog provides a platform for interaction with audience <br />
            through comments and social sharing, creating a sense of community <br />
            around efficient brand. We provide valuable information <br />and insights to readers, <br />
            and promote your products and services in a more natural and informative way.
          </p>
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>
          <p className='my-home-3d'>My Nation Blog creates a unique <br />and knowledgeable content <br />
            that has all the ingredients to build trust <br />with potential customers. <br />
            We help to humanize your brand and connect <br />you with customers on deeper level.
            <br />MNB creates a door for collaboration and networking <br /> with professionals of the same field.</p>
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>
        </div>

        <div className="home-container">
      <h1 className="home-title">My Nation Blog: News, Style And Entertainment</h1>
      <p className="home-description">
        Generate a single smart link for your music from different platforms like:
      </p>
      <div className="icon-group">
        <SiYoutube className="icon youtube" />
        <SiSpotify className="icon spotify" />
        <FaMusic className="icon boomplay" />
        <SiApplemusic className="icon appleMusic" />
        <SiAudiomack className="icon audiomack" />
      </div>
      <Link to="/music-links" className="music-link-button">
        Go to Music Link Generator
      </Link>
    </div>

      </div>
      <div className='my-home-6'>
        <div className='my-home-6a'>
          <h1 className="home-page-d1">Our Blog Educates, Innovates And Entertains</h1>
          <h4 className="home-page-d2">Follow up on our latest news about education</h4>
          <div className='my-home-6b'>
            <img src={myNationimg49} alt="" className="my-home-6-img " />
          </div>
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>
        </div>
      </div>
      <motion.div 
      className='brand'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div 
        className='brand-a'
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
      <div className='home-service'>
        <h1>We Care About Your Music And Lifestyle</h1>
        <div className='home-service-b'>
          <div className='home-service-b1'>
            <h4>Music Production</h4>
            <ul className='ul'>
              <li>Vocalization</li>
              <li>Instrumental</li>
              <li>Acapella</li>
            </ul>
          </div>
          <div className='home-service-b2'>
            <h4>Music Promotion</h4>
            <ul className='ul'>
              <li>Song Distribution</li>
              <li>Collaboration</li>
              <li>Featuring</li>
            </ul>
          </div>
          <div className='home-service-b3'>
            <h4>Blog</h4>
            <ul className='ul'>
              <li>News</li>
              <li>Styles</li>
              <li>Entertainment</li>
            </ul>
          </div>
        </div>
        <Link 
        to="/booking"
        className="inline-block bg-primary hover:bg-violet-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
      >
        Book Now
      </Link>
      </div>

      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-24 px-6 text-center relative overflow-hidden"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        WORK WITH <span className="text-primary">NATIONSOUND</span><br />
        AND GET THE BEST <span className="text-yellow-400">AFROSOUND</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mt-4 mb-8">
        Top-notch production, mixing, and mastering services tailored for Afrobeat artists.
      </p>

      <Link
        to="/booking"
        className="inline-block bg-primary hover:bg-violet-600 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
      >
        Book Now
      </Link>

      {/* Background Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-primary opacity-20 rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-violet-600 opacity-10 rounded-full bottom-10 right-10 animate-ping"></div>
      </div>
    </motion.div>
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
          transition={{ duration: 0.7 }}
        >
          <p>We Create A Fast And Scalable User Interface</p>
          <p style={{ fontSize: '14px', marginTop: '5px' }}>
            Our frontend is optimized for performance and responsive design across all devices.
          </p>
        </motion.div>

        <motion.div
          className=""
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p>Back-End Development</p>
          <p style={{ fontSize: '14px', marginTop: '5px' }}>
            We develop secure and scalable backend systems for dynamic web applications.
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
        className='why-a'
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

      <div className='products'>
        <h1>We Drive Website Traffic</h1>

        <div className='products-div'>
          <div className='div-1'>
            <h6 >Boosts SEO ranking</h6>
          </div>
          <div className='div-2'>
            <h6>Builds brand authority</h6>
          </div>
          <div className='div-3'>
            <h6>Audience engagement</h6>
          </div>
          <div className='div-4'>
            <h6>Lead generation</h6>
          </div>
          <div className='div-5'>
            <h6 >Content repurposing</h6>
          </div>
        </div>
        <div className='products-b'>
          <p>We give your product an awareness that ensures steady demands and unlimited growth</p>
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>
        </div>
        <div className='products-div-2'>
          <div className='div-a'>
            <h1>20k+ Projects Delivered</h1>
            <h6>We deliver projects quickly</h6>
            <p>We maintain speedy progress</p>
          </div>
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>
          <div className='div-b'>
            <h1>10+ MNB Partnership</h1>
            <h6>We establish partnership</h6>
            <p>We encourage interaction</p>
          </div>

        </div>
      </div>

      <div className='home-tech'>
      <motion.img 
        src={myNationimg76} 
        alt="tech image" 
        className="my-image"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div 
        className='home-tech-a'
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>// We Offer Top Notch Tech Services</h1>
        <hr />
        <motion.img 
          src={myNationimg74} 
          alt="" 
          className="tech-img rounded lg overflow-hidden hover:shadow-lg hover:scale-110 hover:rotate-3"
          whileHover={{ scale: 1.05 }}
        />
        <h3>
        At My Nation Blog, we blend technical excellence with heartfelt purpose—offering a beacon of <br />
        direction through the ebb and flow of life."
        </h3>
        <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">
          Learn More
        </Link>
        <hr />
        <motion.img 
          src={myNationimg77} 
          alt="" 
          className="tech-img rounded lg overflow-hidden hover:shadow-lg hover:scale-110 hover:rotate-3"
          whileHover={{ scale: 1.05 }}
        />
        <ul>
          <ol>Cyber Security</ol>
          <ol>Data Analysis</ol>
          <ol>Web Development</ol>
          <ol>Digital Marketing</ol>
          <ol>Programming Languages</ol>
          <ol>UX Design</ol>
          <ol>Graphic Design</ol>
          <ol>Writing</ol>
        </ul>
        <hr />
      </motion.div>

      <motion.div 
        className='home-tech-b'
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.img 
          src={myNationimg75} 
          alt="" 
          className="rounded lg overflow-hidden hover:shadow-lg hover:scale-110 hover:rotate-3"
          whileHover={{ scale: 1.05 }}
        />
        <p>
          Technical skills are the specialized knowledge and expertise required to perform specific tasks <br />
          and use specific tools and programs in real-world situations. Every role requires technical skills. <br />
          For instance, many entry-level positions across industries require cloud computing in Google Drive <br />
          or spreadsheets like Excel or Google Sheets. Examples of more advanced technical skills that a job <br />
          might require include programming languages, technical writing, or data analysis etc.
        </p>
        <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">
          Learn More
        </Link>
      </motion.div>
    </div>

      
    </div>
  )
}
