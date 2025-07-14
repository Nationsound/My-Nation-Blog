import React from 'react'
import { Link } from 'react-router-dom';
import './ThirdSection.css';
import { motion } from 'framer-motion';

const ThirdSection = () => {
  return (
    <motion.div
    initial={{y: -100}}
    animate={{y: 2}}
    transition={{duration: 2, delay: 0.9}}
    >
        <div className='my-home-biz'>
        <div>
          <motion.h3 
          className='my-home-biz-one'
          initial={{x: -100}}
          animate={{x: 2}}
          transition={{duration: 1, delay: 0.8}}
          >
            Our Service

          </motion.h3>
        </div>
        <motion.div 
        className='my-home-biz-two'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}} 
        >
          <motion.h1
          className='px-24'
          initial={{x: -50}}
          animate={{x: 1}}
          transition={{duration:1, delay:0.5}}
          >
            We Help Promote Your Business, and Make Your Brand Known To The World.
          </motion.h1>
          <h3>A platform that enhances music promotion, upgrades rising talents
          and provides adequate information about daily trends.</h3>  
        </motion.div>
        
        <div className='my-homebiz'>
          <motion.div className='my-home-biz-four'
          initial={{x: 0}}
          animate={{x: 2}}
          transition={{duration: 2, delay: 0.8}}
          >
          <p className="my-home-biz-three">Our blog provides a platform for interaction with audience 
            through comments and social sharing, creating a sense of community 
            around efficient brand. We provide valuable information and insights to readers, 
            and promote your products and services in a more natural and informative way.
          </p>
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2 ml-12">Learn More</Link>
          </motion.div>
          <motion.div
          className='my-home-biz-five'
          initial={{x: 0}}
          animate={{x: 2}}
          transition={{duration: 2, delay: 0.8}}
          >
          <p className='my-home-3d'>My Nation Blog creates a unique and knowledgeable content
            that has all the ingredients to build trust with potential customers.
            We help to humanize your brand and connect you with customers on deeper level.
            MNB creates a door for collaboration and networking with professionals of the same field.
          </p> 
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2 ml-12">Learn More</Link>
        </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ThirdSection