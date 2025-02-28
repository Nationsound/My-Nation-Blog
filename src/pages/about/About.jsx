import React from 'react'
import './About.css'
import { Link } from 'react-router-dom';
import truncate from 'truncate';
import { aboutDatas } from '../../dommyData/aboutData'
import myNationimg96 from '../../assets/images/myNationimg96.jpeg'
export default function About() {
  return (
    <div>
      <div className='about'>
        <div className='about-a'>
          <h1>About Us</h1>
        </div>
        <div className='about-b'>
          <Link to="/" className="about-b-home">Home</Link>
          <h6>About <span>us</span></h6>
        </div>
      </div>

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
            <p>Our blog gives you an opportunity to showcase your <br />
              knowledge and expertise on every aspect of your business,<br />
              establishing your leadership and solidifying your <br />
              scope of business, attracting readers through search <br />
              engines and creating a loyal audience. </p>
          </div>
          <div>
            <h4>Content marketing</h4>
            <p>Marketing is constantly changing and using our <br />
              blogs as part of your marketing strategy is one way for <br />
              your organizations to reach current or potential customers.</p>
          </div>
          <div>
            <h4>New Opportunities</h4>
            <p>Our blog offers new opportunities for your products <br />
              to thrive by creating an awareness campaign once it is launched.</p>
          </div>

        </div>

      </div>
      <div className="content-b">
        <h2>My Nation Blog: News, Style and Entertainment</h2>
        <div className='content-c'>
          <div>
            <img src={myNationimg96} alt="" className="about-d-img" />
          </div>
          <div className='content-d'>
            <div>
              <h3>100 +</h3>
              <p>. Active Members</p>
            </div>
            <div>
              <h3>50 +</h3>
              <p>. Projects Exd</p>
            </div>
            <div>
              <h3>25 +</h3>
              <p>. Team Advisors</p>
            </div>
            <div>
              <h3>20 +</h3>
              <p>. Fulfiling Years</p>
            </div>
          </div>
        </div>
        <div className='content-e'>
          <h4>We help business attracts new customers excellently</h4>
        </div>
      </div>

      <div className="">
        {aboutDatas.map((aboutData) => {
          const truncatedContent = truncate(aboutData.content, 200);
          return (
            <div>

              <div className="my-about">
                <div className="">
                  <h2 className='my-about-b'>{aboutData.title}</h2>
                  <img src={aboutData.image} alt={aboutData.i} className="my-image" />
                  <h5>{aboutData.categories}</h5>
                  <p className='my-about'>{truncatedContent}...</p>
                  <div className='bg-[#4527a0] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-Very dark desaturated violet-600 active:bg-violet-700 me-2 mb-2'>
                    <Link to={`/about/${aboutData.id}`} >Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='brand'>
       <div className='brand-div-1'>
       <h1>We Write Blog Posts To Educate Your Audience <br /> And Promote Your Brand</h1>
        <p> We use social media platforms to engage with followers, <br />
          share content, and run contests, create shareable <br />
          content to reach a wider audience and maintain <br />
          consistent customer experience across all touchpoints.  </p>
       </div>
        <div className='brand-div'>
          <h6>We give your product a definte selling point</h6>
        </div>

      </div>


    </div>

  )
}
