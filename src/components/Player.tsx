import React, { useEffect, useState } from 'react';

const Player = ({ songs, currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying, volume, setVolume, setSongs }) => {

  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    if (currentSongIndex >= 0 && songs.length > 0) {
      const song = songs[currentSongIndex];
      const playAudio = async () => {
        const response = await fetch(`https://yank.g3v.co.uk/track/${song.id}`);
        const audioUrl = URL.createObjectURL(await response.blob());
        audio.src = audioUrl;
        audio.play();
        setIsPlaying(true);
      };

      playAudio();

      audio.addEventListener('ended', handleNext);
      return () => {
        audio.removeEventListener('ended', handleNext);
      };
    }
  }, [currentSongIndex, songs]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audio.volume = newVolume;
  };

  //Function to completely end the playback
    const handleEnd = () => {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setCurrentSongIndex(-1);
        
    };

  return (
    <div>
      {currentSongIndex >= 0 && (
        <div>
          <p>{songs[currentSongIndex].title} - {songs[currentSongIndex].artist}</p>
          <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
            <button onClick={handleEnd}>Stop</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      )}
    </div>
  );
};

export default Player;
