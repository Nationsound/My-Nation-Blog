import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadedSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
         console.log("Song uploaded:", response.data);
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="space-y-4">
      {songs.length === 0 ? (
        <p>No songs uploaded yet.</p>
      ) : (
        songs.map((song) => (
          <div key={song._id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p>Artist: {song.artistName}</p>
            <p>Description: {song.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UploadedSongs;
