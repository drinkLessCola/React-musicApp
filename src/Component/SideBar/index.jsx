import React, { Component } from 'react'
import SongListBlock from './SongListBlock';
import './index.css';
import { connect } from 'react-redux';
function SideBar(props) {
  const { playlist } = props;
  console.log('sideBar', playlist)
  return (
    <div className="SideBar">
      <SongListBlock playlist={playlist} />
    </div>
  );
}
export default connect(
  state => ({ playlist: state.user.playlist }),
  {}
)(SideBar);