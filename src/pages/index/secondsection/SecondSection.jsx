import { useState } from 'react';
import './SecondSection.css';

const artists = [
  { id: 1, name: 'Burna Boy', genre: 'Afrobeats', image: '/images/Burna.jpeg' },
  { id: 2, name: 'Tems', genre: 'Alté', image: '/images/tems.jpeg' },
  { id: 3, name: 'Davido', genre: 'Afrobeats', image: '/images/Davido.jpeg' },
  { id: 4, name: 'Rema', genre: 'Afro-fusion', image: '/images/Rema.jpeg' },
  { id: 5, name: 'Ayra Starr', genre: 'Alté', image: '/images/ayra.jpeg' },
  { id: 6, name: 'Wizkid', genre: 'Afrobeats', image: '/images/wizkid.jpeg' },
  { id: 7, name: 'Don Jazzy', genre: 'Afrobeats', image: '/images/Jazzy.jpeg' },
  { id: 8, name: 'Denrynz', genre: 'Afrobeats', image: '/images/denrynz.jpeg' },
  { id: 9, name: 'Razzy AG', genre: 'Afrobeats', image: '/images/Razzy.jpeg' },
  { id: 10,name: 'Olamide', genre: 'Hip/Hop & Rap', image: '/images/Olamide.jpeg' },
];

const genres = ['All', 'Afrobeats', 'Alté', 'Afro-fusion', 'Hip/Hop & Rap'];

const SecondSection = () => {
  // ✅ useState hooks
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedArtist, setSelectedArtist] = useState(null);

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
            key={artist.id}
            className="artist-card"
            onClick={() => handleSelectArtist(artist)}
          >
            <img src={artist.image} alt={artist.name} className="artist-image" />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <div className="artist-modal-overlay" onClick={closeModal}>
          <div className="artist-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={selectedArtist.image} alt={selectedArtist.name} className="modal-image" />
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
