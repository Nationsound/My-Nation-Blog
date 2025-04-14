import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // If using React Router
import { SiYoutube, SiSpotify, SiApplemusic, SiAudiomack } from "react-icons/si";
import { FaMusic } from "react-icons/fa"; // Boomplay icon replacement
import "./SmartLinkPage.css"; // External CSS

const fakeDatabase = {
  abc123: {
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    spotify: "https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb",
    boomplay: "https://www.boomplay.com/songs/12345678",
    appleMusic: "https://music.apple.com/us/album/song-name/1552035769",
    audiomack: "https://audiomack.com/artist/song-name",
  },
};

const SmartLinkPage = () => {
  const { id } = useParams(); // Get the link ID from URL
  const navigate = useNavigate();
  const [musicLinks, setMusicLinks] = useState(null);

  useEffect(() => {
    // Simulate fetching from a database
    if (fakeDatabase[id]) {
      setMusicLinks(fakeDatabase[id]);
    } else {
      navigate("/404"); // Redirect if link not found
    }
  }, [id, navigate]);

  if (!musicLinks) return <p>Loading...</p>;

  return (
    <div className="smart-link-container">
      <h2>Choose Your Music Platform</h2>
      <p>Listen to the song on your favorite platform:</p>

      <div className="platform-buttons">
        {musicLinks.youtube && (
          <a href={musicLinks.youtube} target="_blank" rel="noopener noreferrer" className="platform youtube">
            <SiYoutube className="icon" /> YouTube
          </a>
        )}
        {musicLinks.spotify && (
          <a href={musicLinks.spotify} target="_blank" rel="noopener noreferrer" className="platform spotify">
            <SiSpotify className="icon" /> Spotify
          </a>
        )}
        {musicLinks.boomplay && (
          <a href={musicLinks.boomplay} target="_blank" rel="noopener noreferrer" className="platform boomplay">
            <FaMusic className="icon" /> Boomplay
          </a>
        )}
        {musicLinks.appleMusic && (
          <a href={musicLinks.appleMusic} target="_blank" rel="noopener noreferrer" className="platform appleMusic">
            <SiApplemusic className="icon" /> Apple Music
          </a>
        )}
        {musicLinks.audiomack && (
          <a href={musicLinks.audiomack} target="_blank" rel="noopener noreferrer" className="platform audiomack">
            <SiAudiomack className="icon" /> Audiomack
          </a>
        )}
      </div>
    </div>
  );
};

export default SmartLinkPage;
