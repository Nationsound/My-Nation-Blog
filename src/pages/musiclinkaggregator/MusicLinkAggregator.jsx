import React, { useState } from "react";
import "./MusicLinks.css"; // External CSS file
import { SiYoutube, SiSpotify, SiAudiomack } from "react-icons/si";
import { FaApple, FaMusic } from "react-icons/fa"; // FaApple for Apple Music, FaMusic for Boomplay




const MusicLinkAggregator = () => {
  const [links, setLinks] = useState({
    youtube: "",
    spotify: "",
    boomplay: "",
    appleMusic: "",
    audiomack: "",
  });
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false); // Track if link is copied

  const handleChange = (e) => {
    setLinks({ ...links, [e.target.name]: e.target.value });
  };

  const handleGenerateLink = () => {
    const uniqueId = Math.random().toString(36).substr(2, 6); // Generate a random short ID
    // Mock link generation logic
    setGeneratedLink("http://localhost:5173/smartlink/abc123");
    setCopied(false); // Reset copied state
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true); // Show success message
  };

  return (
    <section className="music-link-container">
      <h2 className="title">Generate a Smart Music Link</h2>
      <p className="description">Enter your music links below and get a single shareable link.</p>

      <div className="input-container">
        {[
          { name: "youtube", icon: <SiYoutube className="icon youtube" /> },
          { name: "spotify", icon: <SiSpotify className="icon spotify" /> },
          { name: "boomplay", icon: <FaMusic className="icon boomplay" /> }, // Placeholder for Boomplay
          { name: "appleMusic", icon: <FaApple className="icon appleMusic" /> }, // Use FaApple
          { name: "audiomack", icon: <SiAudiomack className="icon audiomack" /> },
        ].map(({ name, icon }) => (
          <div key={name} className="input-group">
            {icon}
            <input
              type="text"
              name={name}
              placeholder={`Enter ${name} link`}
              value={links[name]}
              onChange={handleChange}
              className="music-input"
            />
          </div>
        ))}
      </div>

      <button className="generate-btn" onClick={handleGenerateLink}>
        Generate Link
      </button>

      {generatedLink && (
        <div className="generated-link-container">
          <p className="success-message">✅ Your Smart Link is Ready!</p>
          <div className="generated-link">
            <a href={generatedLink} target="_blank" rel="noopener noreferrer">
              {generatedLink}
            </a>
            <button className="copy-btn" onClick={handleCopyLink}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MusicLinkAggregator;
