import React from 'react'
import { Link } from 'react-router-dom';
import './SectionTen.css'

const SectionTen = () => {
  return (
    <div>
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
        
    </div>
  )
}

export default SectionTen