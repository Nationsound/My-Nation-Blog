import { useState, useEffect } from 'react';
import axios from 'axios';
import './SecondSection.css';

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
      const res = await axios.get('http://localhost:1990/mnb/api/getAllArtist');
      // Adjust based on your API response structure
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
        {filteredArtists.map((artist) => (
          <div
            key={artist._id}
            className="artist-card"
            onClick={() => handleSelectArtist(artist)}
          >
            <img
              src={`http://localhost:1990/${artist.imageUrl}`} // adjust if your backend uses different field
              alt={artist.name}
              className="artist-image"
            />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <div className="artist-modal-overlay" onClick={closeModal}>
          <div className="artist-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img
              src={`http://localhost:1990/${selectedArtist.imageUrl}`}
              alt={selectedArtist.name}
              className="modal-image"
            />
            <h3>{selectedArtist.name}</h3>
            <p>Genre: {selectedArtist.genre}</p>
            <p>More details about this artist can go here.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SecondSection;
