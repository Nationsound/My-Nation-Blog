import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const SocialMediaLinks = () => {
    const socialLinks = [
        { icon: <FaFacebook />, url: 'https://web.facebook.com/profile.php?id=61573798280662' },
        { icon: <FaTwitter />, url: 'https://x.com/MNBlog25' },
        { icon: <FaInstagram />, url: 'https://www.instagram.com/mynatblog/' },
        { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/olusola-oguntuase-779069353/' },
      ];
  return (
    <div className="flex gap-4">
    {socialLinks.map((link, index) => (
      <a 
        key={index} 
        href={link.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-900 hover:text-blue-500"
      >
        {link.icon}
      </a>
    ))}
  </div>
  );
};

export default SocialMediaLinks