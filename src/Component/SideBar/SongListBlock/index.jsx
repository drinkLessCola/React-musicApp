import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import LikedIcon from '../../../Icons/LikedIcon';
import UnlikedIcon from '../../../Icons/UnlikedIcon';
import ListIcon from '../../../Icons/ListIcon';
import { connect } from 'react-redux';
import { getPlayListAction } from '../../../Redux/searchActions'
function SongListBlock(props) {
  function changePage(e){
    console.log("changePage", e)
    const target = e.target.closest('li');
    console.log(target.dataset.id)
    props.getPlayListAction(target.dataset.id);
  }
  
  // userId
  // updateTime
  // playCount
  // creator
  // coverImgUrl
  // anonimous
  const { playlist, uid=null } = props;
  console.log("playlist", playlist)
  console.log("uid", uid)
  return (
    <div className="SideBar-unit">
      <div className="title">创建的歌单</div>
      <ul onClick={changePage}>
        {playlist.map((l, idx) => {
          
          return (l.userId === props.uid) && (
            <li className="list-item" key={idx} data-id={l.id}>
              <div className='icon'>{(l.specialType == 5) ? <UnlikedIcon /> : <ListIcon />}</div>
              <NavLink to={`/songlist/${l.id}`}>{l.name}</NavLink>
            </li>
          )
        }
        )}
      </ul>
    </div>
  );
}

export default connect(
  state => ({
    uid:state.user?.user?.userId
  }),
  {
    getPlayListAction:getPlayListAction,
  }
)(SongListBlock)

