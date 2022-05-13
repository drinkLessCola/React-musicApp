import React, { Component } from 'react'
import { connect } from 'react-redux'
import FullScreenIcon from '../../../Icons/FullScreenIcon';
import PauseIcon from '../../../Icons/PauseIcon';
import PlayIcon from '../../../Icons/PlayIcon';
import SoundIcon from '../../../Icons/SoundIcon';
import Progress from '../../Bottom/Progress';
import './index.css';

function VideoPage(props){
  console.log('--------MAIN -> VIDEOPAGE render---------')
  const video = React.createRef();
  const [state, setState] = React.useState({
    curTime: 0,
    pause: false,
    isHandling: false,
  })

  function handlePause() {
    const { pause } = state
    if (pause) video.current.play();
    else video.current.pause();
    setState(state => ({
      pause: !state.pause,
    }))
  }
  // 监听播放器进度变化
  function handleTimeUpdate(event){
    // cur 传给子组件使用
    const cur = Math.floor(event.target.currentTime);
    // const { isHandling } = state;
    // if (isHandling) return;
    setState({
      curTime: cur,
    })
    // 如果正在调整播放进度，则不改变进度条的长度
    const width = Math.floor(cur / event.target.dun * 350) || 0;
    // 修改 css 变量 感觉会影响性能
    document.documentElement.style.setProperty('--video-progress-bar-width', width + 'px');
  }
  // 用户改变 audio 播放进度
  function handleProgressChange(newProgress){
    video.current.currentTime = newProgress;
  }

  function calcProgress(width){
    const newProgress = Math.floor((width || 0));
    handleProgressChange(newProgress);
  }

  function handleMouseDown(event){
    // 
    if (state.isHandling) return;

    // 是否是点击事件
    let isClick = true;

    const { time: totalTime } = props;
    const top = event.target.closest('.Progress-slider-top');
    const bar = event.target.closest('.Progress-slider');
    const barCoord = bar.getBoundingClientRect();
    // 没有点 top，是点击事件
    if (!top) {
      const width = event.clientX - barCoord.left;
      calcProgress(width);
      return;
    }

    const topCoord = top.getBoundingClientRect();
    setState({
      isHandling: true,
    })

    // 鼠标指针点击位置与 top 左上角的 offset
    const start = {
      x: event.clientX,
      y: event.clientY
    }
    const offset = {
      x: event.clientX - topCoord.left,
      y: event.clientY - topCoord.top,
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(event) {
      if (isClick && Math.floor(Math.abs(event.clientX - start.x)) != 0) isClick = false;

      // 拖拽时只改变 css 变量的值
      let width = event.clientX - barCoord.left;
      width = width < 350 ? width : 350;
      width = width > 0 ? width : 0;

      setState({
        curTime: Math.floor(width),
      })
      document.documentElement.style.setProperty('--progress-bar-width', width + 'px');
    }

    function handleMouseUp(event) {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      setState({
        isHandling: false,
      })
      const width = event.clientX - barCoord.left;

      if (!isClick && !event.target.closest('.Progress-slider')) bar.classList.remove('Progress-slider-hover');
      calcProgress(width);
    }
  }
    let url = props.video?.url;
    let totalTime = props?.dun;
    url = url ? url : '';
    totalTime = totalTime ? totalTime/1000 : 0;
    const { curTime, isHandling, pause } = state;
    return (
      <div className='VideoPage'>
        <div className='video-control'>
          <div className="video-block">
            <video
              onTimeUpdate={handleTimeUpdate}
              height='100%'
              ref={video}
              src={url}
              autoPlay
              preload='auto'></video>
          </div>
          <div className='video-control-bar'>
            <div className='video-progress'>
              <div className='video-progress-bar'></div>
              <div className='video-progress-top'></div>
            </div>
            <ul>
              <li className='video-pause' onClick={handlePause}>
                {pause ? <PlayIcon /> : <PauseIcon />}
                <span>{("0" + Math.floor(curTime / 60)).slice(-2)}:
          {("0" + (curTime % 60)).slice(-2)} / {("0" + Math.floor(totalTime / 60)).slice(-2)}:
          {("0" + (totalTime % 60)).slice(-2)}</span>
              </li>
              <li className='video-func'><SoundIcon /><FullScreenIcon /></li>
            </ul>
          </div>

        </div>

      </div>

    )
}

export default connect(
  state => ({ 
    video: state.video,
    dun:state.dun,  
  }),
  {}
)(VideoPage)