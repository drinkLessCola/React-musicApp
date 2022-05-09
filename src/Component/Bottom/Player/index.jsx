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
import { shiftAction, updateCurTimeAction } from '../../../Redux/songActions';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: true,
      isHandling: false,
    };
  }
  audio = React.createRef();
  ratio = 0;
  // 切换播放模式
  changeMode = () => {

  }
  // 播放 / 暂停
  handlePause = (hasSourse) => {
    if (!hasSourse) return;
    const { pause } = this.state;
    if (pause) this.audio.current.play();
    else this.audio.current.pause();
    this.setState({
      pause: !pause,
    })
  }
  // 监听播放器进度变化
  handleTimeUpdate = (event) => {
    // cur 传给子组件使用
    const audio = event.target;
    const cur = Math.floor(audio.currentTime);
    const { isHandling, pause } = this.state;
    if(pause && !this.audio.current.paused){
      this.setState({
        pause:false
      })
    } 

    if (isHandling) return;
    this.props.updateCurTime(cur);
    let bufferWidth = 0;
    if(audio.readyState == 4){
      let buffered = audio.buffered.end(0) / audio.duration;
      bufferWidth = ( buffered * 350) || 0;
      document.documentElement.style.setProperty('--buffer-bar-width', bufferWidth + 'px');
    }
    // 如果正在调整播放进度，则不改变进度条的长度
    const width = Math.floor(cur / audio.duration * 350) || 0;
    // 修改 css 变量 感觉会影响性能
    document.documentElement.style.setProperty('--progress-bar-width', width + 'px');

  }
  // 用户改变 audio 播放进度
  handleProgressChange = (newProgress) => {
    this.audio.current.currentTime = newProgress;
    this.props.updateCurTime(newProgress);
  }


  // 当前歌曲播放结束
  handleEnded = (e) => {
    // switch(this.props.mode){
    //   case 0:break;
    // }
    this.next();
  }
  prev = () => {
    const {shift, curIdx, songs} = this.props;
    const newIdx = ((+curIdx - 1 < 0)? songs.length - 1 : +curIdx - 1);
    shift(newIdx, songs[newIdx].id);
  }
  next = () => {
    const {shift, curIdx, songs} = this.props;
    const newIdx = ((+curIdx + 1 > songs.length - 1)? 0 : +curIdx + 1);
    shift(newIdx, songs[newIdx].id);
  }
  calcProgress = (width) => {
    const newProgress = Math.floor((width || 0) * this.ratio);
    this.handleProgressChange(newProgress);
  }

  handleMouseDown = (event) => {
    if (this.state.isHandling) return;

    // 是否是点击事件
    let isClick = true;

    const that = this;
    const { time: totalTime, updateCurTime } = this.props;
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

      updateCurTime(Math.floor(width * that.ratio));
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
  handleProgress = (event) => {
    let audio = event.target;
    
  }
  handleSeeked = (event) => {
    console.log("seeked", event.target.buffered)
  }
  render() {
    // const hasSourse = (this.props.songSrc == '') ? false : true;
    const { mode, songSrc, song, curTime } = this.props;
    const { isHandling, pause } = this.state;

    // 歌曲总的时间
    const totalTime = Math.floor(song?.dt/1000) || 0 ;
    const id = (song)? song.id : undefined;
    // 一秒对应的进度条长度
    this.ratio = totalTime / 350;
    // 播放模式
    const modeIcon = (mode === 0) ?
      <ModeIcon1 /> : (mode === 1) ?
        <ModeIcon2 /> : (mode === 2) ?
          <ModeIcon3 /> : <ModeIcon4 />
    return (
      <div className="Player">
        <div className="Player-btns">
          <div className="Player-mode" onClick={this.changeMode}>
            {modeIcon}
          </div>
          <ul>
            <li className="Player-btn" onClick={this.prev} title="上一首">
              <PrevIcon />
            </li>
            <li className="Player-btn play-icon" title="暂停" onClick={() => this.handlePause(true)}>
              {pause ? <PlayIcon /> : <PauseIcon />}
            </li>
            <li className="Player-btn" onClick={this.next} title="下一首">
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
          autoPlay={false}
          onEnded={this.handleEnded}
          // onProgress={this.handleProgress}
          onSeeked={this.handleSeeked}
        >Your browser can't support HTML5 Audio</audio>
      </div>
    );
  }
}


export default connect(
  state => ({
    songs:state.songList,
    song:state.song,
    curIdx:state.curIdx,
    curTime:state.curTime
  }),
  {
    shift:shiftAction,
    updateCurTime:updateCurTimeAction
  }
)(Player)