import React, { useState } from "react";
import "./MusicLinks.css"; // External CSS
import { SiYoutube, SiSpotify, SiAudiomack } from "react-icons/si";
import { FaApple, FaMusic } from "react-icons/fa";

const MusicLinkAggregator = () => {
  const [links, setLinks] = useState({
    youtube: "",
    spotify: "",
    boomplay: "",
    appleMusic: "",
    audiomack: "",
  });
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLinks({ ...links, [e.target.name]: e.target.value });
  };

  const handleGenerateLink = async () => {
    if (!title || !coverImage) {
      alert("Please enter a title and select a cover image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("coverImage", coverImage);
      Object.entries(links).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch("http://localhost:1990/mnb/api/smart-link", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.id) {
        setGeneratedLink(`http://localhost:5173/smartlink/${data.id}`);
        setCopied(false);
      } else {
        alert(data.message || "Failed to create smart link");
      }
    } catch (error) {
      console.error("Error creating smart link:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
    }
  };

  return (
    <section className="music-link-container">
      <h2 className="title">Generate a Smart Music Link</h2>
      <p className="description">Enter your song details and links below:</p>

      <div className="input-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="music-input"
          />
        </div>
        <div className="input-group">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="music-input"
          />
        </div>

        {[
          { name: "youtube", icon: <SiYoutube className="icon youtube" /> },
          { name: "spotify", icon: <SiSpotify className="icon spotify" /> },
          { name: "boomplay", icon: <FaMusic className="icon boomplay" /> },
          { name: "appleMusic", icon: <FaApple className="icon appleMusic" /> },
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

      <button className="generate-btn" onClick={handleGenerateLink} disabled={loading}>
        {loading ? "Generating..." : "Generate Link"}
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
