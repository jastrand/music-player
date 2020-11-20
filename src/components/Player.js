import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

export const Player = ({
  setCurrentSong, 
  songs, 
  setSongInfo, 
  songInfo, 
  audioRef, 
  currentSong, 
  isPlaying, 
  setIsPlaying,
  setSongs
}) => {

const activeLibraryHandler = (nextPrev) => {
  const newSongs = songs.map((song) => {
    if (song.id === nextPrev.id) {
      return {
        ...song, active: true
      }
    } else {
      return {
        ...song, active: false
      }
    }
  });
  setSongs(newSongs)
}

const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const getTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const secondsWithZero = String(seconds).padStart(2, "0")
    return `${minutes}:${secondsWithZero}`
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const skipTrackHandler = async (direction) => {
    // Gets the current index of the song that are currenty active 
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // increment the index by 1
    // Modulus/Remainder (%) === if you get to the same 
    // number as the last index in the array go back to zero 
    if (direction === "skip-forward") {
     await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
     activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }

    // 
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play()
        return;
      }
      // decrease the index by -1, this only works in the "middle songs" 
      // because index can not be minus 1, as it does not exist. Array starts with 0
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play()
  };

  // Add the styles 

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
        <input 
          min={0} 
          max={songInfo.duration || 0} 
          value={songInfo.currentTime} 
          onChange={dragHandler}
          type="range"
        />
        <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon 
          onClick={() => skipTrackHandler('skip-back')}
          className="skip-back" 
          size="2x" 
          icon={faAngleLeft} 
        />
        <FontAwesomeIcon 
          onClick={playSongHandler} 
          className="play" 
          size="2x" 
          icon={isPlaying ? faPause : faPlay} 
        />
        <FontAwesomeIcon 
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward" 
          size="2x" 
          icon={faAngleRight} 
        />
      </div>
     
    </div>
    
  )
}