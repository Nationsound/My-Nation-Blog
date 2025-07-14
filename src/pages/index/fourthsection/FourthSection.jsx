import React from 'react'
import { Link } from 'react-router-dom'
import './FourtSection.css';
import myNationimg49 from '../../../assets/images/myNationimg49.jpg';

const FourthSection = () => {
  return (
    <div>
        <div className='my-home-six'>
        <div className='my-home-six-one'>
          <h1 className="my-home-six-two">Our Blog Educates, Innovates And Entertains</h1>
          <h4 className="my-home-six-three">Follow up on our latest news about education</h4>
          <div className='my-home-six-four'>
            <img src={myNationimg49} alt="" className="my-home-six-img " />
          </div>
          <Link to={'/about'} className="bg-primary text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">Learn More</Link>
        </div>
      </div> 
    </div>
  )
}

export default FourthSection 