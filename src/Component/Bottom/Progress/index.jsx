import React, { Component } from 'react'
import './index.css';
export default class Progress extends Component {
  isHandling = false;

  handleMouseEnter = (event) => {
    const that = this;
    const target = event.target.closest('.Progress-slider');
    target.classList.add('Progress-slider-hover');
    target.addEventListener('mouseleave', handleMouseLeave);
    // 💩山代码
    function handleMouseLeave(event) {
      if (!that.props.isHandling) {
        target.classList.remove('Progress-slider-hover');
      }
      target.removeEventListener('mouseleave', handleMouseLeave);
    }
  }
  // 点击操控 Progress
  // 在同一个元素上面 mousedown 和 mouseup 会触发 click
  // 同时具有拖拽和点击，不监听 click 事件，而是使用 mousedown，判断是否发生位移。
  // handleClick = (event) => {
  //   console.log('click');
  //   const target = event.target;
  //   const progressBarCoord = target.getBoundingClientRect();
  //   const width = event.clientX - progressBarCoord.left;
  //   this.changeProgress(width);
  // }

  // 想知道这么写会不会影响性能...
  render() {
    const { totalTime, curTime, handleMouseDown, timeStyle } = this.props;
    const totalTimeMin = Math.floor(totalTime / 60),
      totalTimeSec = totalTime % 60,
      bufferTime = 0;
    return (
      <div className="Progress">
        <span>
          {("0" + Math.floor(curTime / 60)).slice(-2)}:
          {("0" + (curTime % 60)).slice(-2)}
        </span>
        {timeStyle == 2 && <span>{("0" + totalTimeMin).slice(-2)}:
          {("0" + totalTimeSec).slice(-2)}</span>}
        <div className="Progress-slider"
          onMouseEnter={this.handleMouseEnter}
          onMouseDown={handleMouseDown}
        >
          <div className='Progress-slider-bar'>
            <div className='Progress-slider-top' ></div>
          </div>
        </div>
        {timeStyle == 1 && <span>
          {("0" + totalTimeMin).slice(-2)}:
          {("0" + totalTimeSec).slice(-2)}
        </span>}
      </div>
    );
  }
}
