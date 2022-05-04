import React, { Component } from 'react'
import Player from './Player';
import SongInfo from './SongInfo';
import Func from './Func';
import './index.css';
export default class Bottom extends Component {
  render() {
    return (
      <div className="Bottom">
        <SongInfo/>
        <Player time={this.props.song?.time}
          changeSong={this.props.changeSong}
          changeMode={this.props.changeMode}
          mode={this.props.mode}
          songSrc={this.props.songSrc}
        />
        <Func showPlayList={this.props.showPlayList} />
      </div>
    );
  }
}
