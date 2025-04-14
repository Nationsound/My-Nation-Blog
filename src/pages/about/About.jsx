import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import truncate from 'truncate';
import { aboutDatas } from '../../dommyData/aboutData';
import myNationimg96 from '../../assets/images/myNationimg96.jpeg';
import Nationsound from '../../assets/images/Nationsound.png';

export default function About() {
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

      {/* Content Section */}
      <div className='content'>
        <div>
          <h1>We offer several benefits for our customers or clients</h1>
        </div>

        <div className='content-a'>
          <div>
            <h4>We Create Brand Awareness</h4>
            <p>We help build brand awareness and create customer loyalty.</p>
          </div>
          <div>
            <h4>Establishing Leadership</h4>
            <p>Our blog gives you an opportunity to showcase your knowledge and expertise on every aspect of your business, establishing your leadership and solidifying your scope of business, attracting readers through search engines, and creating a loyal audience.</p>
          </div>
          <div>
            <h4>Content Marketing</h4>
            <p>Marketing is constantly changing, and using our blogs as part of your marketing strategy is one way for your organization to reach current or potential customers.</p>
          </div>
          <div>
            <h4>New Opportunities</h4>
            <p>Our blog offers new opportunities for your products to thrive by creating an awareness campaign once it is launched.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="content-b">
        <h2>My Nation Blog: News, Style and Entertainment</h2>
        <div className='content-c'>
          <div>
            <img src={myNationimg96} alt="My Nation Blog" className="about-d-img" />
          </div>
          <div className='content-d'>
            <div>
              <h3>100 +</h3>
              <p>. Active Members</p>
            </div>
            <div>
              <h3>50 +</h3>
              <p>. Projects Executed</p>
            </div>
            <div>
              <h3>25 +</h3>
              <p>. Team Advisors</p>
            </div>
            <div>
              <h3>20 +</h3>
              <p>. Fulfilling Years</p>
            </div>
          </div>
        </div>
        <div className='content-e'>
          <h4>We help businesses attract new customers excellently</h4>
        </div>
      </div>

      {/* Sound Section */}
      <div className='nationsound'>
        <img src={Nationsound} alt="Nation Sound" className="nationsound-img" />
      </div>

      {/* Blog Data Section */}
      <div>
        {aboutDatas.map((aboutData) => {
          const truncatedContent = truncate(aboutData.content, 200);
          return (
            <div key={aboutData.id} className="my-about">
              <h2 className='my-about-b'>{aboutData.title}</h2>
              <img src={aboutData.image} alt={aboutData.title} className="my-image" />
              <h5>{aboutData.categories}</h5>
              <p className='my-about'>{truncatedContent}...</p>
              <div className='bg-[#4527a0] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700'>
                <Link to={`/about/${aboutData.id}`}>Learn More</Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Section */}
      <div className='brand'>
        <div className='brand-div-1'>
          <h1>We Write Blog Posts To Educate Your Audience And Promote Your Brand</h1>
          <p>We use social media platforms to engage with followers, share content, and run contests, creating shareable content to reach a wider audience and maintain a consistent customer experience across all touchpoints.</p>
        </div>
        <div className='brand-div'>
          <h6>We give your product a definite selling point</h6>
        </div>
      </div>
    </div>
  );
}
