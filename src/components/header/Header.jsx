import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import MNBLogo1 from '../../assets/images/MNBLogo1.png';

const Header = ()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="my-header shadow-md sticky top-0 z-50 bg-white">
      <nav className="mx-auto flex flex-wrap justify-between items-center p-3 max-w-7xl">

        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            <img src={MNBLogo1} alt="MNB Logo" className="my-Logo" />
          </Link>
          <div className="flex flex-col">
            <p className="my-header-a1">Get familiar with</p>
            <Link to="/" className="my-header-a">My Nation Blog</Link>
          </div>
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden text-2xl focus:outline-none bg-[#959A4A]"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-sm md:text-base">
          <li><Link to="/" className="hover:text-[#959A4A]">Home</Link></li>
          <li><Link to="/about" className="hover:text-[#959A4A]">About</Link></li>
          <li><Link to="/service" className="hover:text-[#959A4A]">Service</Link></li>
          <li><Link to="/contact" className="hover:text-[#959A4A]">Contact</Link></li>
          <li><Link to="/signup" className="hover:text-[#959A4A]">SignUp</Link></li>
          <li><Link to="/blog" className="hover:text-[#959A4A]">Blog</Link></li>
        </ul>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white border-t space-y-4 py-4">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/service" onClick={toggleMenu}>Service</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/signup" onClick={toggleMenu}>SignUp</Link></li>
          <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
        </ul>
      )}
    </header>
  );
}
export default Header;