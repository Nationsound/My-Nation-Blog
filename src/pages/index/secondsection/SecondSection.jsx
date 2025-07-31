import { useState, useEffect } from 'react';
import api from '../../../utils/axios';
import './SecondSection.css';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const genres = ['All', 'Afrobeats', 'Alté', 'Afro-fusion', 'Hip/Hop & Rap'];

const SecondSection = () => {
  const [artists, setArtists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const res = await api.get('/mnb/api/getAllArtist');
      setArtists(res.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const filteredArtists =
    selectedGenre === 'All'
      ? artists
      : artists.filter((a) => a.genre === selectedGenre);

  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
  };

  const closeModal = () => setSelectedArtist(null);

  return (
    <section className="top-artists-section">
  <h2 className="top-artists-title">Top Nigerian Artists</h2>

  <div className="genre-filter">
    <label htmlFor="genre">Filter by Genre:</label>
    <select
      id="genre"
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
    >
      {genres.map((genre) => (
        <option key={genre}>{genre}</option>
      ))}
    </select>
  </div>

  <div className="artist-carousel">
    {filteredArtists.map((artist) => {
      // Normalize backslashes to forward slashes
      const normalizedPath = artist.imageUrl?.replace(/\\/g, '/');
      // Build the final URL
      const imageUrl = normalizedPath?.startsWith('uploads')
        ? `${baseURL.replace(/\/$/, '')}/${normalizedPath}`
        : normalizedPath;

      return (
        <div
          key={artist._id}
          className="artist-card"
          onClick={() => handleSelectArtist(artist)}
        >
          <img
            src={imageUrl}
            alt={artist.name}
            className="artist-image"
          />
          <p className="artist-name">{artist.name}</p>
        </div>
      );
    })}
  </div>

  {selectedArtist && (() => {
    const normalizedPath = selectedArtist.imageUrl?.replace(/\\/g, '/');
    const imageUrl = normalizedPath?.startsWith('uploads')
      ? `${baseURL.replace(/\/$/, '')}/${normalizedPath}`
      : normalizedPath;

    return (
      <div className="artist-modal-overlay" onClick={closeModal}>
        <div className="artist-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>×</button>
          <img
            src={imageUrl}
            alt={selectedArtist.name}
            className="modal-image"
          />
          <h3>{selectedArtist.name}</h3>
          <p>Genre: {selectedArtist.genre}</p>
          <p>More details about this artist can go here.</p>
        </div>
      </div>
    );
  })()}
</section>

  );
};

export default SecondSection;
