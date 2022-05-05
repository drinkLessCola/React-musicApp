import React, { Component } from 'react'
import { connect } from 'react-redux';
import Liked from '../../../Liked';
import { togglePlayerPageAction } from '../../../Redux/playerPageAction';

class SongInfo extends Component {
  handlePlayerPage(){
    console.log("#??", this.props)
    this.props.togglePlayerPage(this.props.song.id);
    document.documentElement.style.setProperty('--box-shadow-img', this.props.song.al.imgUrl)
  }
  render() {
    const {song, likedSongs} = this.props;
    console.log("@", song);
    if(song == null) return <div className="SongInfo"></div>;
    return (
      <div className="SongInfo" onClick={this.handlePlayerPage.bind(this)}>
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
            <Liked like={likedSongs.has(song.id)} />
          </div>
          <div className="SongName-singer">{song.ar.reduce((pre, a)=>pre + ((pre=='')?'':'/') + a.name,'')}</div>
        </div>
      </div>
    )
  }

}

export default connect(
  state => ({
    song:state.song,
    likedSongs:new Set(state.likedList),
    playerPageOpen:state.playerPageOpen
  }),
  {
    togglePlayerPage:togglePlayerPageAction
  }
)(SongInfo)