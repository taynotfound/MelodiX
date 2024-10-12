import { WindowProps } from "@prozilla-os/core";
import { useState } from 'react';
import Player from './Player';
import Search from './Search';

export function Melodix({ app, setTitle }: WindowProps) {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume range from 0 to 1
  const [queue, setQueue] = useState([]);

  const addToQueue = (song) => {
    setQueue([...queue, song]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <Search setSongs={setSongs} setCurrentSongIndex={setCurrentSongIndex} />
        <ul>
          {songs.map((song, index) => (
            <li key={song.id}>
              {song.title} - {song.artist}
              <button onClick={() => addToQueue(song)}>Add to Queue</button>
              <button onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true); // Set playing state when a song is selected
              }}>Play</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#f1f1f1', padding: '10px', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)' }}>
        <Player
          songs={queue.length > 0 ? queue : songs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          volume={volume}
          setVolume={setVolume}
		  setSongs={setSongs}
        />
      </div>
    </div>
  );
}
