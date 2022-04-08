import React, { Component } from 'react'
import SoundIcon from '../../../Icons/SoundIcon'
import PlayListIcon from '../../../Icons/PlayListIcon'
import PubSub from 'pubsub-js'
import './index.css';
export default function Func(props) {
  const ctr = React.createRef();
  function handleClick(event) {
    console.log(event);

    const target = event.target;
    const top = target.closest('.soundController-bar-top');
    const ctrCoord = ctr.getBoundingClientRect();

    let y = event.clientY - ctrCoord.top;
    if (y < 0) y = 0;
    else if (y > 70) y = 70;
    const volume = Math.floor((70 - y) / 7 * 10) / 100;
    document.documentElement.style.setProperty('--sound-bar-height', 70 - y + 'px')
    handleVolumeChange(volume);
  }

  function handleVolumeChange(volume) {
    console.log(volume);
    PubSub.publish('VolumeChange', volume);
  }

  return (
    <ul className='Func'>
      <li className='Sound'>
        <SoundIcon></SoundIcon>
        <div className='soundController' onClick={handleClick}>
          <div ref={ctr} className='soundController-bar-bg'></div>
          <div className='soundController-bar'>
            <div className='soundController-bar-body'></div>
            <div className='soundController-bar-top'></div>
          </div>
        </div>
      </li>
      <li className='PlayList' onClick={props.showPlayList}><PlayListIcon></PlayListIcon></li>
    </ul>
  )

}
