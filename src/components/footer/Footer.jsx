import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = ()=> {
  return (
    <div className="my-footer bg-[#3B314C] text-white">
      <div className="my-footer-1 container mx-auto px-6 py-12 flex flex-wrap justify-between">
        <div className="footer-logo mb-6 md:mb-0">
          <Link to="/" className="text-3xl font-semibold hover:text-gray-300 transition duration-300">
            My Nation Blog
          </Link>
        </div>
        <div className="footer-links flex flex-col sm:flex-row sm:space-x-8 mb-6 md:mb-0">
          <div>
            <h3 className="font-semibold text-lg mb-2">Company</h3>
            <Link to="/about" className="block hover:text-gray-300 transition duration-200">About</Link>
            <Link to="/service" className="block hover:text-gray-300 transition duration-200">Service</Link>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Legal</h3>
            <Link to="/license" className="block hover:text-gray-300 transition duration-200">License</Link>
            <Link to="/terms" className="block hover:text-gray-300 transition duration-200">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="block hover:text-gray-300 transition duration-200">Privacy Policy</Link>
            <Link to="/brand-guideline" className="block hover:text-gray-300 transition duration-200">Brand Guideline</Link>
          </div>
        </div>
      </div>

      <div className="my-footer-2 container mx-auto px-6 py-6 flex flex-wrap justify-between items-center border-t border-gray-700">
        <div className="footer-social mb-4 sm:mb-0">
          <ul className="flex space-x-6">
            {/* Social Media Links */}
            <li>
              <a href="https://www.instagram.com/mynatblog/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-200">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://web.facebook.com/profile.php?id=61573798280662" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-200">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://x.com/MNBlog25" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-200">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/olusola-oguntuase-779069353/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-200">
                LinkedIn 
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-rights text-sm text-gray-500">
          <span>© 2025 <Link to="/" className="hover:text-gray-300">My Nation Blog</Link>. All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
}
export default Footer;
