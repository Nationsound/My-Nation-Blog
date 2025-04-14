import React from 'react';
import './Service.css';
import { Link } from 'react-router-dom';
import truncate from 'truncate';
import { serviceDatas } from '../../dommyData/serviceData';

const Button = ({ to, children }) => (
  <div className="bg-[#4527a0] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2">
    <Link to={to}>{children}</Link>
  </div>
);

export default function Service() {
  return (
    <div>
      <div className='service-a'>
        <div className='service-b'>
          <h1>Service</h1>
        </div>
        <div className='service-c'>
          <Link to="/" className="service-c-home">Home</Link>
          <h6>Service</h6>
        </div>
      </div> 

      <div className='service-d'>
        <div className='service-d-2'>
          <h5>// Our Service</h5>
          <h1>We Build Fast And Scalable <br />User Interface</h1>
          <div className='service-d-3'>
            {['MNB creates a social media automation business...', 'Create a polished portfolio website...', 'We provide a digital marketing atmosphere...', 'We design websites and UIs...'].map((content, index) => (
              <div key={index}>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="header">
        <h2>My Nation Blog: News, Style and Entertainment</h2>
      </div>

      <div className='service-e'>
        <div className='service-e-1'>
          <h5>// Our Service</h5>
          <h3>We design and build both the front-end(user-facing) <br />and the back-end(server side) components of a website.</h3>
          <div className='service-e-1a'>
            <div className='service-e-1b'>
              <div className='front'>
                <h4>Front-End Development</h4>
                <ul>
                  <li>We code using HTML, CSS, and JavaScript...</li>
                  <li>We Implement user interface (UI) design...</li>
                  <li>We integrate JavaScript frameworks...</li>
                </ul>
              </div>
            </div>
            <div className='service-e-1c'>
              <div className='back'>
                <h4>Back-End Development</h4>
                <ul>
                  <li>We build the server-side logic...</li>
                  <li>We design and manage databases...</li>
                  <li>We set up and configure servers...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {serviceDatas.map(serviceData => {
        const truncatedContent = truncate(serviceData.content, 200);
        return (
          <div key={serviceData.id}>
            <div className="service">
              <h2 className='my-service'>{serviceData.title}</h2>
              <img src={serviceData.image} alt={serviceData.i} className="my-image" />
              <h5>{serviceData.categories}</h5>
              <p className='my-service-p'>{truncatedContent}...</p>
              <Button to={`/service/${serviceData.id}`}>Learn More</Button>
            </div>
          </div>
        );
      })}

      <div className='service-f'>
        <h5>// Our Service</h5>
        <h1>WHY WE ARE MORE THAN A BLOG?</h1>
        <div className='service-f-a'>
          <div className='service-f-1'>
            <h3>// Experience an incredible growth in your music.</h3>
            <p>we help nurture a talent from bintin to big thing.</p> 
          </div>
        </div>
        <h6>We Produce, and Upload Your Songs for Streams and Download</h6>
      </div>
    </div>
  );
}
