import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { togglePlayerPageAction } from '../../Redux/playerPageAction';
import { getLyricAction } from '../../Redux/songActions'
import './index.css'

function PlayerPage(props) {
  const { playerPageOpen = false, song, curTime } = props;
  const lyric = useRef(null);
  console.log("playerPageOpen", playerPageOpen)
  const handleClose = function(){
    console.log('close')
    props.togglePlayerPage();
  }

  // 
  let curIdx = 0;
  let curLyric = (props.lyric != null) ? props.lyric.filter((l, idx) => {
      const startTime = l?.time;
      const endTime = ((idx + 2 >= props.lyric.length)? 1e10 : props.lyric[idx+1]?.time);
      if(startTime && startTime <= curTime && endTime > curTime) {
        curIdx = idx;
        return true;
      }
  }): [];
  
  useLayoutEffect(()=> {
    if(curIdx < 6) return;
    console.log(lyric)
    if(!lyric || !lyric.current) return;
    lyric.current.scrollTop = (curIdx - 6) * 30;
  },[curIdx])


  return (
    <div className={'PlayerPage ' + (playerPageOpen? "active" : '' )}>
      {/* <img className='bg-effect' src={song?.al.picUrl}></img> */}
      {/* <div className='player-cover-container'> */}
      <button className='close-btn' onClick={handleClose}>∨</button>
      <div className='player-cover'>
        <div className='player-cover-img'>
          <img src={song?.al.picUrl}></img>
        </div>
        <img className='shadow-effect' src={song?.al.picUrl}></img>
      </div>
      <div className='player-right'>
        <h2 className='player-song-name'>{song?.name}</h2>
        <div className='player-lyric' ref={lyric}>
          {props.lyric instanceof Array && props.lyric.map((l, idx) => {
            return <p className={curLyric.includes(l)? 'lyric-active' : ''} key={idx}>{l?.text}</p>
          })}
        </div>
      </div>
    </div>
  )
}


export default connect(
  (state) => ({
    playerPageOpen: state.playerPageOpen,
    lyric: state.lyric,
    song: state.song,
    curTime: state.curTime
  }),
  {
    getLyric: getLyricAction,
    togglePlayerPage:togglePlayerPageAction
  }
)(PlayerPage)