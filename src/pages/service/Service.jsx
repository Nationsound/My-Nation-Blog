import React from 'react'
import './Service.css'
import { Link } from 'react-router-dom';
import truncate from 'truncate';
import { serviceDatas } from '../../dommyData/serviceData';
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
        <div className='service-d-1'>

        </div>

        <div className='service-d-2'>
          <h5>// Our Service</h5>
          <h1>We Build Fast And Scalable <br />User Interface</h1>
          <div className='service-d-3'>
            <div>
              <p>MNB creates a social media automation business <br />
                and offers tools and services that schedule <br />
                posts, automate interactions, and provide <br />
                analytics across various platforms. </p>
            </div>
            <div>
              <p>Create a polished portfolio website highlighting <br />
                your past projects, skills, and client testimonials.</p>
            </div>
            <div>
              <p>We provide a digital marketting atmosphere <br />
                that encompasses a wide variety of marketing types <br />
                rather than focusing on a single strategy.</p>
            </div>
            <div>
              <p>We design websites and UIs, database for <br />
                websites optimisation and write clean codes <br />
                for smart phones</p>
            </div>
          </div>
        </div>

      </div>
      <div className="header">
        <h2>My Nation Blog: News, Style and Entertainment</h2>
      </div>

      <div className='service-e'>
        <div className='service-e-1'>
          <h5>// Our Service</h5>
          <h3>We design and build both the front-end(user-facing) <br />
            and the back-end(server side) components of a website <br />
            or application.</h3>
          <div className='service-e-1a'>
            <div className='service-e-1b'>
              <div className='front-2'>

              </div>
              <div className='front'>
                <div className='front-1'>
                  <h4>Front-End Development</h4>
                  <ul>
                    <li>We code using HTML, CSS, and JavaScript to <br />
                      create the visual design and interactive <br />
                      elements of a website. </li>
                    <li>We Implement user interface (UI) design <br />
                      elements and ensuring a responsive <br />
                      user experience. </li>
                    <li>We integrate JavaScript frameworks <br />
                      like React, Angular, or Vue.js for <br />
                      dynamic functionality. </li>
                  </ul>
                </div>

              </div>

            </div>
            <div className='service-e-1c'>
              <div className='back'>
                <div className='back-1'>
                  <h4>Back-End Development</h4>
                  <ul>
                    <li>We build  the server-side logic using languages <br />
                      like Python, PHP, Java, or Node.js to handle data <br />
                      processing, database interactions, and <br />
                      application functionality. </li>
                    <li>We design and manage databases <br />
                      (like MySQL, PostgreSQL) to store and <br />
                      retrieve data efficiently. </li>
                    <li>We set up and configure  servers to host the application.</li>
                  </ul>

                </div>
              </div>
              <div className='back-2'>

              </div>

            </div>
          </div>
        </div>
        <div className='service-e-2'>

        </div>
      </div>

      <div className="">
        {serviceDatas.map((serviceData) => {
          const truncatedContent = truncate(serviceData.content, 200);
          return (
            <div>

              <div className="service">
                <div className="">
                  <h2 className='my-service'>{serviceData.title}</h2>
                  <img src={serviceData.image} alt={serviceData.i} className="my-image" />
                  <h5>{serviceData.categories}</h5>
                  <p className='my-service-p'>{truncatedContent}...</p>
                  <div className='bg-[#4527a0] text-[#ffffff] w-32 focus:outline-none font-large rounded-lg  text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-violet-600 active:bg-violet-700 me-2 mb-2'>
                    <Link to={`/service/${serviceData.id}`} >Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className='service-f'>
          <h5>// Our Service</h5>
          <h1>WHY WE ARE MORE THAN A BLOG?</h1>
          <div className='service-f-1'>
            <h3>// Experience an incredible growth in your music.</h3>
            <p>we help nurture a talent from bintin to big thing.</p> 
          </div>
          <h6>We Produce, and upload your songs for streams and download</h6>
        </div>
      </div>



    </div>

  )
}
