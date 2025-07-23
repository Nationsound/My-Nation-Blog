import React from 'react'
import './AboutDataDetails.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { aboutDatas } from '../../dommyData/aboutData';
import myNationimg100 from '../../assets/images/myNationImg100.jpeg'


export default function AboutDataDetails() {
  const { id } = useParams();
  const aboutDataDetail = aboutDatas.find((p) => p.id === parseInt(id));

  if (!aboutDataDetail) return <div>About details not found</div>;
  return (
    <div>
      <div className='about'>
        <div className='about-a'>
          <h1>About Us</h1>
        </div>
        <div className='about-b'>
          <Link to="/" className="about-b-home">Home</Link>
          <h6>About us</h6> 
        </div>
      </div>
      <motion.div
        className="my-about-container"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="my-about-card">
          <h2 className='my-about-title'>{aboutDataDetail.title}</h2>

          <div className="my-about-meta">
            <p className="my-about-author">By: {aboutDataDetail.author}</p>
            <p className="my-about-date">{aboutDataDetail.date}</p>
          </div>

          <div className="my-about-image-wrapper">
            <img
              src={aboutDataDetail.image}
              alt={aboutDataDetail.title} 
              className="my-about-image"
            />
          </div>

          <h5 className='my-about-category'>{aboutDataDetail.categories}</h5>

          <p className='my-about-content'>{aboutDataDetail.content}</p>
        </div>
      </motion.div>

      <div className='about-c'>
  <div className='about-c-1'>
    <motion.div className='about-c-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h4>What We Offer</h4>
    </motion.div>

    <motion.div className='about-c-3' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
      <h1>Daily Trends, Connections Via <br /> Partnership, Collaboration <br /> And Promotion</h1>
    </motion.div>

    <div className='about-c-0'>
      <motion.div className='about-c-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
        <p>We offer online promotion for your products of <br />
          any kind via daily blog across well known social <br />
          platforms. An opportunity for your business to <br />
          thrive beyond expectations. </p>

        <p>My Nation Blog provides adequate information <br />
          on fresh news, latest styles and traffics in the <br />
          industry.
        </p>

        <p>We help create personality for your company, products <br />
          and brand and make your business more credibly <br />
          approachable</p>
      </motion.div>

      <div className='about-c-5'>
       <motion.div className='about-c-5d' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <h1>Our Views</h1>
        </motion.div> 
        <motion.div className='about-c-5a' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <h1>Our Goals</h1>
        </motion.div>
        <motion.div className='about-c-5b' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <h1>Our Ideas</h1>
        </motion.div>
        <motion.div className='about-c-5c' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <h1>Our Concepts</h1>
        </motion.div>
        
      </div>
    </div>
  </div>
</div>

      <div className="about-d">
      <div>
        <motion.img
          src={myNationimg100}
          alt=""
          className="about-d-img"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>
      <div className='about-d-1'>
        <div className='about-d-1a'>
          <motion.h4
            whileHover={{ scale: 1.1, color: "rgb(149, 154, 74)" }}
            transition={{ duration: 0.3 }}
          >
            SUBSTANCE.
          </motion.h4>
          <motion.h4
            whileHover={{ scale: 1.1, color: "rgb(149, 154, 74)" }}
            transition={{ duration: 0.3 }}
          >
            SERVICE.
          </motion.h4>
          <motion.h4
            whileHover={{ scale: 1.1, color: "rgb(149, 154, 74)" }}
            transition={{ duration: 0.3 }}
          >
            SUCCESS.
          </motion.h4>
        </div>
        <div className='about-d-2'>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Why You Really Need Us?
          </motion.h1>
        </div>
        <div className='about-d-1b'>
          <motion.div
            className='about-d-1b-a'
            whileHover={{ scale: 1.1, backgroundColor: "rgb(149, 154, 74)" }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className='about-d-1b-b'
            whileHover={{ scale: 1.1, backgroundColor: "rgb(149, 154, 74)" }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className='about-d-1b-c'
            whileHover={{ scale: 1.1, backgroundColor: "rgb(149, 154, 74)" }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className='about-d-1b-d'
            whileHover={{ scale: 1.1, backgroundColor: "rgb(149, 154, 74)" }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className='about-d-1c'>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            We render Blog Service
          </motion.h2>
        </div>
        <div className='about-d-1d'>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            My Nation Blog is best at promoting <br />
            individual and collective enterprises, <br />
            creating a unique atmosphere for successful business, <br />
            encouraging young talents to soar in the industry, <br />
            and providing valuable content that can attract potential <br />
            customers and encourage them to sign up for emails and newsletters.
          </motion.p>
        </div>
      </div>
    </div>
    </div>
  )
}
