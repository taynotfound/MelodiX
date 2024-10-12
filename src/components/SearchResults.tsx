import React from 'react';

const SearchResults = ({ songs, addToQueue, handlePlaySong, queue, setCurrentSongIndex, currentSongIndex }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={song.id} style={{ marginBottom: '10px' }}>
            {song.title} - {song.artist}
            <button onClick={() => {
              addToQueue(song); // Add to queue
              if(queue.length === 0) setCurrentSongIndex(0); // Play the song if queue is empty
              if(queue.length === 1) handlePlaySong(0); // Play the song if queue has only one
              if(currentSongIndex === -1) setCurrentSongIndex(0); // Play the song if no song is playing
            }} style={{
              backgroundColor: '#FF974D',
              color: '#E5F2FF',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 12px',
              cursor: 'pointer',
              marginLeft: '8px'
            }}>Add to Queue & Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
