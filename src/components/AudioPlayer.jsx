import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

/**
 * Audio Player Component for Listening Section
 * Plays audio segments with controls
 */
function AudioPlayer({ audioUrl, segment, onAudioEnd }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onAudioEnd) onAudioEnd();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onAudioEnd]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = parseFloat(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="audio-controls">
        <button 
          onClick={togglePlay} 
          className="play-button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div className="time-display">
          {formatTime(currentTime)}
        </div>

        <input
          type="range"
          className="seek-bar"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Audio progress"
        />

        <div className="time-display">
          {formatTime(duration)}
        </div>

        <div className="volume-control">
          <span className="volume-icon">
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </span>
          <input
            type="range"
            className="volume-bar"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
          />
        </div>
      </div>

      <div className="audio-info">
        <span className="segment-indicator">
          🎧 Listening - Segment {segment}
        </span>
      </div>
    </div>
  );
}

export default AudioPlayer;
