import React, {useState, useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

export const Player = ({currentSong, isPlaying, setIsPlaying}) => {

const audioRef = useRef(null)

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

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime
  const duration = e.target.duration
  setSongInfo({...songInfo, currentTime: current, duration})
}
const [songInfo, setSongInfo] = useState({
  currentTime: null,
  duration: null
});

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input 
        min={0} 
        max={songInfo.duration} 
        value={songInfo.currentTime} 
        type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      <audio 
      onTimeUpdate={timeUpdateHandler} 
      onLoadedMetadata={timeUpdateHandler}
      ref={audioRef} 
      src={currentSong.audio}
      ></audio>
    </div>
    
  )
}