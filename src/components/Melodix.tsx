import { WindowProps } from "@prozilla-os/core";
import { useState } from 'react';
import Player from './Player';
import Search from './Search';

export function melodix({ app, setTitle }: WindowProps) {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume range from 0 to 1
  const [queue, setQueue] = useState([]);
  const addToQueue = (song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
  };

  const handlePlaySong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true); // Set playing state when a song is selected

  };

  return (
    <div style={{
      backgroundColor: '#1E262E',
      color: '#E5F2FF',
      minHeight: '100vh', // Ensure the container takes full height
      display: 'block',
      flexDirection: 'column',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      overflowY: 'scroll', // Allow vertical scrolling
    }}>
      <div>
        <h2>Queue</h2>
        <ul>
          {queue.map((song, index) => (
            <li key={song.id}>{song.title} - {song.artist}</li>
          ))}
        </ul>
      </div>
      <div style={{
        backgroundColor: '#4D9CFF',
        color: '#E5F2FF',
        padding: '15px',
        textAlign: 'center',
        fontSize: '1.8rem',
        borderRadius: '8px'
      }}>Melodix</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <Search setSongs={setSongs} addToQueue={addToQueue} queue={queue} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex}/>
        <ul>
          {songs.map((song, index) => (
            <li key={song.id} style={{ marginBottom: '10px' }}>
              {song.title} - {song.artist}
              <button onClick={() => addToQueue(song)} style={{
                backgroundColor: '#FF974D',
                color: '#E5F2FF',
                border: 'none',
                borderRadius: '5px',
                padding: '8px 12px',
                cursor: 'pointer',
                marginLeft: '8px'
              }}>Add to Queue</button>
              <button onClick={() => handlePlaySong(index)} style={{
                backgroundColor: '#FF974D',
                color: '#E5F2FF',
                border: 'none',
                borderRadius: '5px',
                padding: '8px 12px',
                cursor: 'pointer',
                marginLeft: '8px'
              }}>Play</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Player component remains unchanged */}
      {(queue.length > 0 || currentSongIndex >= 0) && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#1E262E',
          padding: '10px',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
        }}>
          <Player
            songs={queue.length > 0 ? queue : songs}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            volume={volume}
            setVolume={setVolume}
            setSongs={setSongs}
            setTitle={setTitle}
          />
        </div>
      )}
    </div>
  );
}
