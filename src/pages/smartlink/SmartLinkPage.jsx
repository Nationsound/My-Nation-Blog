import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SiYoutube,
  SiSpotify,
  SiAudiomack,
} from "react-icons/si";
import { FaApple, FaMusic } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import api from "../../utils/axios";
import "./SmartLinkPage.css";

const SmartLinkPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [musicLinks, setMusicLinks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSmartLink = async () => {
      try {
        const res = await api.get(`/mnb/api/getSmartLink/${slug}`);
        setMusicLinks(res.data);
        console.log("✅ API Response:", res.data);

      } catch (error) {
        console.error("Error fetching smart link:", error.message);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchSmartLink();
  }, [slug, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!musicLinks) return <p className="text-center mt-10">Smart link not found.</p>;

  const normalizedLinks = {
  ...res.data,
  title: res.data.songTitle,
  artist: res.data.artistName,
};
setMusicLinks(normalizedLinks);


 const coverImageUrl = musicLinks.coverImagePublicId
  ? `https://res.cloudinary.com/mynationblog/image/upload/${musicLinks.coverImagePublicId}`
  : "/default-cover.jpg"; // fallback image



  return (
    <>
      {/* Open Graph Meta Tags */}
      <Helmet>
        <title>{musicLinks.songTitle} | My Nation Blog</title>
        <meta property="og:title" content={`${musicLinks.songTitle} by ${musicLinks.artistName || "Unknown Artist"}`} />
        <meta property="og:description" content="Listen now on My Nation Blog SmartLink!" />
        <meta property="og:image" content={coverImageUrl} />
        <meta property="og:url" content={`https://www.mynationblog.fun/smartlink/${slug}`} />
        <meta property="og:type" content="music.song" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="smart-link-container mx-auto max-w-xl mt-10 p-4 bg-white shadow rounded text-center">
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt="Cover artwork"
            className="w-48 h-48 object-cover mx-auto rounded mb-4 shadow"
          />
        )}

        {musicLinks.songTitle && (
          <h2 className="text-2xl font-bold mb-2">{musicLinks.songTitle}</h2>
        )}

        {musicLinks.artistName && (
          <p className="text-gray-600 italic mb-4">By {musicLinks.artistName}</p>
        )}

        <p className="mb-6">Listen to the song on your favorite platform:</p>

        <div className="platform-buttons grid grid-cols-1 gap-4">
          {musicLinks.youtube && (
            <a
              href={musicLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <SiYoutube className="text-2xl" /> YouTube
            </a>
          )}
          {musicLinks.spotify && (
            <a
              href={musicLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              <SiSpotify className="text-2xl" /> Spotify
            </a>
          )}
          {musicLinks.boomplay && (
            <a
              href={musicLinks.boomplay}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              <FaMusic className="text-2xl" /> Boomplay
            </a>
          )}
          {musicLinks.appleMusic && (
            <a
              href={musicLinks.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              <FaApple className="text-2xl" /> Apple Music
            </a>
          )}
          {musicLinks.audiomack && (
            <a
              href={musicLinks.audiomack}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              <SiAudiomack className="text-2xl" /> Audiomack
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default SmartLinkPage;
