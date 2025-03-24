import React from 'react'
import './HeaderA.css'
import SocialMediaLinks from '../socialmedia/SocialMediaLinks'
import ContactInfo from '../socialmedia/ContactInfo'
export default function HeaderA() {
  return (
    <div className='header-a'>
      <div className="flex md:gap-8 justify-between items-center p-4 pb-6">
      <SocialMediaLinks />
      <ContactInfo className="ml-auto" />
      </div>
      
    </div>
  );
};
