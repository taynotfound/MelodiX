import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ setSongs, setCurrentSongIndex }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchSongs = async () => {
    try {
      const [title, artist] = searchTerm.split('-').map(s => s.trim());
      const response = await axios.get(`http://toybox.g3v.co.uk/search?title=${title}&artist=${artist}`);
      const results = response.data.data.result ? [response.data.data.result] : [];
      setSongs(results);
      setCurrentSongIndex(results.length > 0 ? 0 : -1); // Reset current song index to 0 if results exist, otherwise -1
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  return (
    <div style={{ marginBottom: '60px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for songs (title - artist)"
        style={{ width: '80%', padding: '8px', marginRight: '8px' }}
      />
      <button onClick={searchSongs} style={{ padding: '8px' }}>Search</button>
    </div>
  );
};

export default Search;
