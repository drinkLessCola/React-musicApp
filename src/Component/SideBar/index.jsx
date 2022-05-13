import React from 'react'
import SongListBlock from './SongListBlock';
import './index.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
function SideBar(props) {
  console.log('--------SIDEBAR render---------')
  const { playlist, uid } = props;
  console.log('sideBar', playlist)
  return (
    <div className="SideBar">
      <NavLink to="/home" className={({isActive}) => (isActive)? "list-item active-list":"list-item"} >发现</NavLink>
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