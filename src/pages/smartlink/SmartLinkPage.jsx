import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SiYoutube,
  SiSpotify,
  SiApplemusic,
  SiAudiomack,
} from "react-icons/si";
import { FaMusic } from "react-icons/fa";
import api from "../../utils/axios";
import "./SmartLinkPage.css";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SmartLinkPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [musicLinks, setMusicLinks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSmartLink = async () => {
      try {
        const res = await api.get(`/mnb/api/getSmartLink/${id}`);
        setMusicLinks(res.data);
      } catch (error) {
        console.error("Error:", error.message);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchSmartLink();
  }, [id, navigate]);

  const getImageUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${baseURL}/${url.replace(/^\/+/, "")}`;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!musicLinks) return <p className="text-center mt-10">Smart link not found.</p>;

  return (
    <div className="smart-link-container mx-auto max-w-xl mt-10 p-4 bg-white shadow rounded text-center">
      {musicLinks.coverImage && (
        <img
          src={getImageUrl(musicLinks.coverImage)}
          alt="Cover artwork"
          className="w-48 h-48 object-cover mx-auto rounded mb-4 shadow"
        />
      )}

      {musicLinks.title && (
        <h2 className="text-2xl font-bold mb-2">{musicLinks.title}</h2>
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
            <SiApplemusic className="text-2xl" /> Apple Music
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
  );
};

export default SmartLinkPage;
