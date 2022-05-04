import React, { Component } from 'react'
import SongListBlock from './SongListBlock';
import './index.css';
import { connect } from 'react-redux';
function SideBar(props) {
  const { playlist, uid } = props;
  console.log('sideBar', playlist)
  return (
    <div className="SideBar">
      <SongListBlock playlist={playlist.filter((song) => song.userId === uid)} type={1}/>
      <SongListBlock playlist={playlist.filter((song) => song.userId !== uid)} type={2}/>
    </div>
  );
}
export default connect(
  state => ({ 
    playlist: state.user.playlist,
    uid:state.user?.user?.userId
  }),
  {}
)(SideBar);