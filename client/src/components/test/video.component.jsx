import React from 'react'
import './video.styles.css'
import ReactPlayer from 'react-player'
import Vid from '../../assets/react.mp4'

const Video = () => {
  return (
    <div className='video'>
        <ReactPlayer url= {Vid} playing={true} light={true} controls={true} width={400} height={400}/>
    </div>
  )
}

export default Video