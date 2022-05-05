import React from 'react'
import { connect } from 'react-redux'
import { getLyricAction } from '../../Redux/songActions'
import './index.css'

function PlayerPage(props) {
  const { playerPageOpen = false, song } = props;
  console.log("playerPageOpen", playerPageOpen)
  return (
    // playerPageOpen &&
    <div className='PlayerPage'>
      {/* <img className='bg-effect' src={song?.al.picUrl}></img> */}
      {/* <div className='player-cover-container'> */}
      <div className='player-cover'>
        <div className='player-cover-img'>
          <img src={song?.al.picUrl}></img>
        </div>
        <img className='shadow-effect' src={song?.al.picUrl}></img>
      </div>
      {/* </div> */}
      <div className='player-right'>
        <h2 className='player-song-name'>{song?.name}</h2>
        <div className='player-lyric'>
          {props.lyric.split('\n').map((l, idx) => <p key={idx}>{l}</p>)}
        </div>
      </div>
    </div>
  )
}


export default connect(
  (state) => ({
    playerPageOpen: state.playerPageOpen,
    lyric: state.lyric,
    song: state.song
  }),
  {
    getLyric: getLyricAction
  }
)(PlayerPage)