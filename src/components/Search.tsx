import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

const Search = ({ setSongs, addToQueue, queue, setCurrentSongIndex, currentSongIndex }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchSongs = async () => {
    try {
      const [title, artist] = searchTerm.split('-').map(s => s.trim());
      const response = await axios.get(`http://toybox.g3v.co.uk/search?title=${title}&artist=${artist}`);
      const results = response.data.data.result ? [response.data.data.result] : [];
      setSearchResults(results); // Set the search results
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  return (
    <div style={{
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'scroll',
    }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for songs (title - artist)"
        style={{
          width: '80%',
          padding: '12px',
          borderRadius: '5px',
          border: '1px solid #4D9CFF',
          marginRight: '8px',
          backgroundColor: '#2A2D30',
          color: '#E5F2FF',
          fontSize: '1rem'
        }}
      />
      <button onClick={searchSongs} style={{
        padding: '12px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#FF974D',
        color: '#E5F2FF',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontSize: '1rem'
      }}>
        Search
      </button>
      <br></br>
      {/* Render SearchResults component */}
      <SearchResults songs={searchResults} addToQueue={addToQueue} queue={queue} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex} />
    </div>
  );
};

export default Search;
