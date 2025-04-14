import React from 'react'
import './AboutDataDetails.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { aboutDatas } from '../../dommyData/aboutData';
import myNationimg100 from '../../assets/images/myNationimg100.jpeg'


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
      <div className="my-about">
        <h2 className='my-about-b'>{aboutDataDetail.title}</h2>
        <img src={aboutDataDetail.image} alt={aboutDataDetail.i} className="my-image" />
        <h5 className='my-about-categories'>{aboutDataDetail.categories}</h5>
        <p className='my-about-p'>{aboutDataDetail.content}</p>
      </div>

      <div className='about-c'>
        <div className='about-c-1'>
          <div className='about-c-2'>
            <h4>What We Offer</h4>
          </div>
          <div className='about-c-3'>
            <h1>Daily Trends, Connections Via <br />
              Partnership, Collaboration <br />
              And Promotion</h1>
          </div>
          <div className='about-c-0'>
            <div className='about-c-4'>
              <p>We offer online promotion for your products of <br />
                any kind via daily blog across well known social <br />
                platforms. An opportunity for your business to <br />
                thrive beyond expectaions. </p>

              <p>My Nation Blog provides adequate information <br />
                on fresh news, latest styles and traffics in the <br />
                industry.
              </p>

              <p>We help create personality for your company, products <br />
                and brand and make your business more credibly <br />
                approachable</p>
            </div>
            <div className='about-c-5'>
              <div className='about-c-5a'>
                <h1>Our Goals</h1>
              </div>
              <div className='about-c-5b'>
                <h1>Our Ideas</h1>
              </div>
              <div className='about-c-5c'>
                <h1>Our Concepts</h1>
              </div>
              <div className='about-c-5d'>
                <h1>Our Views</h1>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className='about-d'>
        <div>
          <img src={myNationimg100} alt="" className="about-d-img" />
        </div> 
        <div className='about-d-1'>
            <div className='about-d-1a'>
            <h4>SUBSTANCE.</h4>
            <h4>SERVICE.</h4>
            <h4>SUCCESS.</h4>
            </div>
            <div className='about-d-2'>
              <h1>Why You Really Need Us?</h1>
            </div>
            <div className='about-d-1b'>
              <div className='about-d-1b-a'>
                
              </div>
              <div className='about-d-1b-b'>

              </div>
              <div className='about-d-1b-c'>

              </div>
              <div className='about-d-1b-d'>

              </div>
            </div>
            <div className='about-d-1c'>
              <h2>We render Blog Service</h2>
            </div>
            <div className='about-d-1d'>
              <p>My Nation Blog is best at promoting <br />
              individual and collective enterprises, <br />
              creating a unique atmosphere for successful business, <br />
              encouraging young talents to soar in the industry, <br />
              and providing valuable contents that can attracts potential <br />
              customers and encourage them to sign up for emails and newsletters. </p>
            </div>
        </div>
      </div>
    </div>
  )
}
