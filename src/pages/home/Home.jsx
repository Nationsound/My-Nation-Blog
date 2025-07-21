import React from 'react'
import './Home.css'
import FirstSection from '../index/firstsection/FirstSection';
import SecondSection from '../index/secondsection/SecondSection';
import ThirdSection from '../index/thirdsection/ThirdSection';
import FourthSection from '../index/fourthsection/FourthSection';
import FifthSection from '../index/fifthsection/FifthSection';
import SixthSection from '../index/sixthsection/SixthSection';
import SeventhSection from '../index/sevethsection/SeventhSection';
import EightSection from '../index/eigthsection/EightSection';
import NinthSection from '../index/ninthsection/NinthSection';
import SectionTen from '../index/sectionten/SectionTen';
import SectionEleven from '../index/sectioneleven/SectionEleven';
import Slideshow from '../index/slideshow/Slideshow';
import MusicLink from '../index/musicLink/MusicLink';
import SongsUpload from '../index/songsUpload/SongsUpload';
import Partnership from '../index/partnership/Partnership';




const Home =()=> {
  return (
    <div className="home">

          <div>
            <Slideshow /> 
          </div>
      
          
          <div>
            <FirstSection />
          </div>

          <div>
            <SecondSection />
          </div>

          <div>
            <ThirdSection />
          </div>
          <div> 
            <MusicLink />
          </div>
          <div>
            <SongsUpload />
          </div>

          <div>
            <FourthSection />
          </div>

          <div>
            
          <FifthSection />
          </div>
         
          <div>
            <SixthSection />
          </div>

          <SeventhSection />

          <div>
            <EightSection />
          </div>

          <div>
            <NinthSection />
          </div>

          <div>
            <SectionTen />
          </div>

          <div>
            <SectionEleven />
          </div>
          <div>
            <Partnership />
          </div>
         
    </div>
  )
}
export default Home;
