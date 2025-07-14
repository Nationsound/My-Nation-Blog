import React from 'react'
import './SectionEleven.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import olatinn1 from '../../../assets/images/olatinn1.jpeg'
import myNationimg75 from '../../../assets/images/myNationimg75.jpeg'
import myNationimg77 from '../../../assets/images/myNationimg77.jpeg'

const SectionEleven = () => {
  return (
    <div>
        <div className='home-tech'>
      

      <motion.div 
        className='home-tech-one'
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>// In Collaboration with OLATINN</h1>
        <hr />
        <motion.img 
          src={olatinn1} 
          alt="" 
          className="tech-img rounded lg overflow-hidden hover:shadow-lg hover:scale-110 hover:rotate-3"
          whileHover={{ scale: 1.05 }}
        />
        <h3>
        Olusola Adebayo Tech and Innovation (OLATINN) brings you a <br />technical excellence with heartfelt <br /> purpose—offering a beacon of
        direction through the ebb and flow of life."
        </h3>
        <Link to={'/service'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">
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
          <ol>Data Analysis</ol>
          <ol>Web Development</ol>
          <ol>Programming Languages</ol>
          <ol>UX Design</ol>
          <ol>Graphic Design</ol>
          <ol>Writing</ol>
        </ul>
        <hr />
      </motion.div>

      <motion.div 
        className='home-tech-two'
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
          “Powering the future together — <span className='olatinn'>Olatinn</span> and our visionary partner revolutionize the digital world.” <br />
          Olusola Adebayo Tech and Innovation Limited specialized in scalable cloud infrastructure and backend <br />
          systems for enterprise clients. They carry on the business of developing, desigining, deploying, <br />
          maintaining, and supporting full-stack software solutions, including but not limited to frontend <br />
          and backend web and mobile applications, APIs, Databases, Cloud Infrastructure, and DevOps services; <br />
          and to provide consultiing, training and technical support in the fields of software engineering, product <br />
          development, digital transformation for individuals, startups, businesses, and enterprises, both in <br />
          domestic and international markets.
        </p>
        <Link to={'/service'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">
          Learn More
        </Link>
      </motion.div>
    </div>

    </div>
  )
}

export default SectionEleven