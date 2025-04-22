import React from 'react'
import './HeaderA.css'
import SocialMediaLinks from '../socialmedia/SocialMediaLinks'
import ContactInfo from '../socialmedia/ContactInfo'

export default function HeaderA() {
  return (
    <div className='header-a'>
      <div className="flex justify-between items-center p-4 pb-6 max-w-9xl mx-auto">
        {/* Social Media Links (Left side) */}
        <SocialMediaLinks />
        
        {/* Contact Info (Right side) */}
        <ContactInfo />
      </div>
    </div>
  );
};
