import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'

export const Player = ({setCurrentSong, songs, setSongInfo, songInfo, audioRef, currentSong, isPlaying, setIsPlaying}) => {

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

  const skipTrackHandler = (direction) => {
    // Gets the current index of the song that are currenty active 
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // increment the index by 1
    // Modulus/Remainder (%) === if you get to the same 
    // number as the last index in the array go back to zero 
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }

    // 
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1])
        return;
      }
      // decrease the index by -1, this only works in the "middle songs" 
      // because index can not be minus 1, as it does not exist. Array starts with 0
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
   
  };


  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input 
          min={0} 
          max={songInfo.duration || 0} 
          value={songInfo.currentTime} 
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
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
        icon={faAngleRight} />
      </div>
     
    </div>
    
  )
}