import React from "react";
import { SiYoutube, SiSpotify, SiApplemusic, SiAudiomack } from "react-icons/si";
import { Link } from 'react-router-dom';
import { FaMusic } from "react-icons/fa"; 
import './MusicLink.css'
import { motion } from "framer-motion";
const MusicLink = () => {
  return (
    <div>
        <motion.div className="home-container">
      <h1 className="home-title">My Nation Blog: News, Style And Entertainment</h1>
      <p className="home-description">
        Generate a single smart link for your music from different platforms like:
      </p>
      <div className="icon-group">
        <SiYoutube className="icon youtube" /> 
        <SiSpotify className="icon spotify" />
        <FaMusic className="icon boomplay" />
        <SiApplemusic className="icon appleMusic" />
        <SiAudiomack className="icon audiomack" />
      </div>
      <Link to="/music-links" className="music-link-button">  
        Go to Music Link Generator
      </Link>
    </motion.div>
    </div>
  )
}

export default MusicLink