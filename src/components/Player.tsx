import React, { useEffect, useState } from 'react';

const Player = ({ songs, currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying, volume, setVolume, setSongs, setTitle }) => {
    const [audio, setAudio] = useState(new Audio());
    const [queue, setQueue] = useState([]);

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
            
            setTitle(song.title + " - " + song.artist + " | Melodix");
            audio.addEventListener('ended', handleNext);
            return () => {
                audio.removeEventListener('ended', handleNext);
            };
        }
    }, [currentSongIndex, songs]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
            let title = songs[currentSongIndex].title;
            let artist = songs[currentSongIndex].artist;
            setTitle('Paused - ' + title + " - " + artist + " | Melodix");
        } else {
            audio.play();
            let title = songs[currentSongIndex].title;
            let artist = songs[currentSongIndex].artist;
            setTitle('' + title + " - " + artist + " | Melodix");
        }
        setIsPlaying(!isPlaying);
        
    };

    const handleNext = () => {
        if (songs.length > 0) {
            const nextIndex = (currentSongIndex + 1) % songs.length; // Wrap around to the start
            setCurrentSongIndex(nextIndex);
        }
    };

    const handlePrevious = () => {
        if (songs.length > 0) {
            const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Wrap around to the end
            setCurrentSongIndex(prevIndex);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        audio.volume = newVolume;
    };



    const addToQueue = (song) => {
        setQueue((prevQueue) => [...prevQueue, song]);
    };

    return (
        <div style={{
            backgroundColor: '#1E262E',
            color: '#E5F2FF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 25px rgba(0, 0, 0, 0.9)',
            marginTop: '20px',
            border: '2px solid #4D9CFF',
            height: 'auto', // Allow height to adjust based on content
            maxHeight: '40vh', // Set a maximum height relative to the viewport height
            overflow: 'auto', // Allow scrolling if content exceeds max height
        }}>
            {currentSongIndex >= 0 && (
                <div>
                    <p>{songs[currentSongIndex].title} - {songs[currentSongIndex].artist}</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '10px'
                    }}>
                        <button onClick={handlePlayPause} style={{
                            backgroundColor: '#FF974D',
                            color: '#E5F2FF',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 12px',
                            cursor: 'pointer'
                        }}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button onClick={handlePrevious} style={{
                            backgroundColor: '#FF974D',
                            color: '#E5F2FF',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 12px',
                            cursor: 'pointer'
                        }}>Previous</button>
                        <button onClick={handleNext} style={{
                            backgroundColor: '#FF974D',
                            color: '#E5F2FF',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 12px',
                            cursor: 'pointer'
                        }}>Next</button>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            backgroundColor: '#1E262E',
                            borderRadius: '5px'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Player;
