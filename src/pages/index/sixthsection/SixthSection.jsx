import React from 'react'
import './SixthSection.css'
import { Link } from 'react-router-dom'

const SixthSection = () => {
  return (
    <div>
        <div className='home-service'>
        <h1>We Care About Your Music And Lifestyle</h1>
        <div className='home-service-one'>
          <div className='home-service-two'>
            <h4>Music Production</h4>
            <ul className='ul'>
              <li>Vocalization</li>
              <li>Instrumental</li>
              <li>Acapella</li>
            </ul>
          </div>
          <div className='home-service-three'>
            <h4>Music Promotion</h4>
            <ul className='ul'>
              <li>Song Distribution</li>
              <li>Collaboration</li>
              <li>Featuring</li>
            </ul>
          </div>
          <div className='home-service-four'> 
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
    </div>
  )
}

export default SixthSection