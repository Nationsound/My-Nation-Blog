import React from 'react'
import './SlideShow.css'
import {Typewriter} from "react-simple-typewriter"

const Slideshow = () => {
  return (
    <div>
        <div className="slideshow">
                <h2 className='EXP'>
                  <Typewriter
                  words={["GET OUR DAILY UPDATES ON NEWS, STYLES AND ENTERTAINMENT", "AN EXPERIENCE THAT EXTENDS BEYOND BLOG", "WHERE TALENT IS NURTURED FROM BINTIN TO BIG THING"]}
                  loop={true}
                  cursor
                  cursorStyle=""
                  typeSpeed={60}
                  deleteSpeed={50}
                  delaySpeed={1500}
                   />
                </h2>
                <h1>Welcome to MyNation Blog</h1>
        
          </div>

    </div>
  )
}

export default Slideshow