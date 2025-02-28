import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import myLogo from '../../assets/images/myLogo.jpg'
export default function Header() {
    return (
        <header className="my-header">

            <nav className=" mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-2xl font-bold"><img src={myLogo} alt="" className="my-Logo" /></Link>
                <p className="my-header-a1">Get familiar with</p>
                <Link to="/" className="my-header-a">My Nation Blog</Link>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-gray-300 transition duration-200">About</Link>
                    </li>
                    <li>
                        <Link to="/service" className="hover:text-gray-300 transition duration-200">Service</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-300 transition duration-200">Contact</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="hover:text-gray-300 transition duration-200">SignUp</Link>
                    </li>
                    <li>
                        <Link to="/blog" className="hover:text-gray-300 transition duration-200">Blog</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}