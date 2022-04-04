import React, { Component } from 'react'
import { connect } from 'react-redux';
import Liked from '../../../Liked';

class SongInfo extends Component {
  render() {
    const {song} = this.props;
    console.log(song);
    if(song == null) return <div className="SongInfo"></div>;
    return (
      <div className="SongInfo">
        <div className="SongImage">
         <img
            className="SongImage-image"
            src={song.al.picUrl}
            alt={song.al.name}
          />
        </div>
        <div className="SongName">
          <div className="SongName-name">
            {song.name}
            <Liked like={song.name} />
          </div>
          <div className="SongName-singer">{song.ar.reduce((pre, a)=>pre + ((pre=='')?'':'/') + a.name,'')}</div>
        </div>
      </div>
    )
  }

}

export default connect(
  state => ({song:state.song}),
  {}
)(SongInfo)