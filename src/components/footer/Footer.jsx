import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div className='my-footer'>
     <div className='my-footer-1'>
     <div>
       <Link to="/" className="">My Nation Blog</Link>
      </div>
      <div>
        <h1>Company</h1>
      </div>
      <div>
      <Link to="/about" className="hover:text-gray-300 transition duration-200">About</Link>
      </div>
      <div>
      <Link to="/service" className="hover:text-gray-300 transition duration-200">Service</Link>
      </div>
      <div>
        <h1>Media</h1>
      </div>
      <div>
        <h1>Legal</h1>
      </div>
     </div>

      <div className='my-footer-2'>
        <div>
        <ul>
          <li>Question</li>
          <li>Help</li>
          <li>Chat</li>
        </ul>
        </div>
        <div>
        <ul>
          <li>Our Team</li>
          <li>Advertisement</li>
          <li>Collaboration</li>
        </ul>
        </div>
        <div>
        <ul>
          <li>Blog</li>
          <li>Promotion</li>
          <li>Production</li>
          <li>Distribution</li>
        </ul>
        </div>
        <div>
        <ul>
          <li>Entertainnment</li>
          <li>Education</li>
          <li>Politics</li>
          <li>Sport</li>
          <li>Commerce</li>
          <li>Agriculture</li>
          <li>Breaking News</li>
        </ul>
        </div>
        <div>
        <ul>
          <li>Instagram</li>
          <li>Facebook</li>
          <li>Thread</li>
          <li>Twitter</li>
          <li>TikTok</li>
        </ul>
        </div>
        <div>
        <ul>
          <li>License</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Brand Guidline</li>
        </ul>
        </div>
      </div>
      <hr />
      <div>
        <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center ml-20">© 2025 <a href="">My Nation Blog</a>. All Rights Reserved.

        </span>
      </div>
    </div>
  )
}
