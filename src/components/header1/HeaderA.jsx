import React from 'react'
import './HeaderA.css'
import SocialMediaLinks from '../socialmedia/SocialMediaLinks'
import ContactInfo from '../socialmedia/ContactInfo'

const HeaderA = ()=> {
  return (
    <div className='header-a'>
  <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 max-w-9xl mx-auto gap-2 sm:gap-0">
    {/* Social Media Links (Left side) */}
    <SocialMediaLinks />
    
    {/* Contact Info (Right side) */}
    <ContactInfo />
  </div>
</div>


  );
};
export default HeaderA;
