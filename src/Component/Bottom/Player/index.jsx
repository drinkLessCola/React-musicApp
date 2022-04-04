import React, { Component } from 'react'
import PrevIcon from '../../../Icons/PrevIcon';
import NextIcon from '../../../Icons/NextIcon';
import PauseIcon from '../../../Icons/PauseIcon';
import Progress from '../Progress';
import ModeIcon1 from '../../../Icons/ModeIcon1';
import ModeIcon2 from '../../../Icons/ModeIcon2';
import ModeIcon3 from '../../../Icons/ModeIcon3';
import ModeIcon4 from '../../../Icons/ModeIcon4';
import PlayIcon from '../../../Icons/PlayIcon';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: 0,
      pause: false,
      isHandling: false,
    };

  }
  audio = React.createRef();
  ratio = 0;
  // 切歌 
  handleChange(num) {
    this.props.changeSong(num);
  }
  // 播放 / 暂停
  handlePause = (hasSourse) => {
    if (!hasSourse) return;
    const { pause } = this.state;
    console.log(pause);
    if (pause) this.audio.current.play();
    else this.audio.current.pause();
    this.setState({
      pause: !pause,
    })
  }
  // 监听播放器进度变化
  handleTimeUpdate = (event) => {
    // cur 传给子组件使用
    const cur = Math.floor(event.target.currentTime);
    const { isHandling } = this.state;
    if (isHandling) return;
    this.setState({
      curTime: cur,
    })
    // 如果正在调整播放进度，则不改变进度条的长度
    const width = Math.floor(cur / event.target.duration * 350) || 0;
    // 修改 css 变量 感觉会影响性能
    document.documentElement.style.setProperty('--progress-bar-width', width + 'px');
  }
  // 用户改变 audio 播放进度
  handleProgressChange = (newProgress) => {
    this.audio.current.currentTime = newProgress;
  }

  calcProgress = (width) => {
    const newProgress = Math.floor((width || 0) * this.ratio);
    this.handleProgressChange(newProgress);
  }

  handleMouseDown = (event) => {
    // 
    if (this.state.isHandling) return;

    // 是否是点击事件
    let isClick = true;

    const that = this;
    const { time: totalTime } = this.props;
    const top = event.target.closest('.Progress-slider-top');
    const bar = event.target.closest('.Progress-slider');
    const barCoord = bar.getBoundingClientRect();
    // 没有点 top，是点击事件
    if (!top) {
      const width = event.clientX - barCoord.left;
      this.calcProgress(width);
      return;
    }

    const topCoord = top.getBoundingClientRect();
    this.setState({
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
      if (isClick && Math.floor(Math.abs(event.clientX - start.x) * that.ratio) != 0) isClick = false;

      // 拖拽时只改变 css 变量的值
      let width = event.clientX - barCoord.left;
      width = width < 350 ? width : 350;
      width = width > 0 ? width : 0;

      that.setState({
        curTime: Math.floor(width * that.ratio),
      })
      document.documentElement.style.setProperty('--progress-bar-width', width + 'px');
    }

    function handleMouseUp(event) {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      that.setState({
        isHandling: false,
      })
      const width = event.clientX - barCoord.left;

      if (!isClick && !event.target.closest('.Progress-slider'))  bar.classList.remove('Progress-slider-hover');
      that.calcProgress(width);
    }
  }

  componentDidMount() {
    PubSub.subscribe('VolumeChange', ((_, volume) => {
      this.audio.current.volume = volume;
    }))
  }
  render() {
    // const hasSourse = (this.props.songSrc == '') ? false : true;
    const { mode, changeMode, songSrc,song } = this.props;
    const { curTime, isHandling, pause } = this.state;

    const totalTime = Math.floor(song?.dt/1000) || 0 ;
    const id = (song)? song.id : undefined;

    this.ratio = totalTime / 350;
    const modeIcon = (mode === 0) ?
      <ModeIcon1 /> : (mode === 1) ?
        <ModeIcon2 /> : (mode === 2) ?
          <ModeIcon3 /> : <ModeIcon4 />
    return (
      <div className="Player">
        <div className="Player-btns">
          <div className="Player-mode" onClick={changeMode}>
            {modeIcon}
          </div>
          <ul>
            <li className="Player-btn" onClick={() => this.handleChange(-1)} title="上一首">
              <PrevIcon />
            </li>
            <li className="Player-btn play-icon" title="暂停" onClick={() => this.handlePause(true)}>
              {pause ? <PlayIcon /> : <PauseIcon />}
            </li>
            <li className="Player-btn" onClick={() => this.handleChange(1)} title="下一首">
              <NextIcon />
            </li>
          </ul>
        </div>
        <Progress
          totalTime={totalTime}
          curTime={curTime}
          className="Player-progress"
          handleProgressChange={this.handleProgressChange}
          handleMouseDown={this.handleMouseDown}
          isHandling={isHandling}
        />
        <audio
          ref={this.audio}
          src={(id)?`https://music.163.com/song/media/outer/url?id=${id}.mp3`:''}
          onTimeUpdate={this.handleTimeUpdate}
          autoPlay={true}
        >Your browser can't support HTML5 Audio</audio>
      </div>
    );
  }
}


export default connect(
  state => ({song:state.song}),
  {}
)(Player)