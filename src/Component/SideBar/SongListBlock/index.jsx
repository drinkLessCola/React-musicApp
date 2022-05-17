import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import LikedIcon from '../../../Icons/LikedIcon';
import UnlikedIcon from '../../../Icons/UnlikedIcon';
import ListIcon from '../../../Icons/ListIcon';
import { connect } from 'react-redux';
import { getPlayListAction } from '../../../Redux/searchActions'
import MenuContext from '../../../Context/MenuContext';
const TYPE = [
  " ",
  "创建的歌单",
  "收藏的歌单"
]
const menuItems =(<ul>
  <li data-func="playList">播放</li>
  <li data-func="playListNext">下一首播放</li>
</ul>)
function SongListBlock(props) {
  console.log('-------SIDEBAR -> SONGLISTBLOCK render---------')
  function changePage(e) {
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
  const { playlist, uid = null, type } = props;
  console.log("playlist", playlist)
  console.log("uid", uid)

  return (
    <div className="SideBar-unit">
      <div className="title">{TYPE[type]}</div>
      <MenuContext.Consumer>
        {({toggleMenu}) => (
          <ul onClick={changePage} onContextMenu={toggleMenu.bind(null, menuItems)}>
          {playlist.map((l, idx) => {
            return (
              <NavLink to={`/songlist/${l.id}`}>
                <li className="list-item" key={idx} data-id={l.id}>
                  <div className='icon'>{(l.specialType == 5) ? <UnlikedIcon /> : <ListIcon />}</div>
                  <span>{l.name}</span>
                </li>
              </NavLink>
            )
          }
          )}
        </ul>
        )}
      
      </MenuContext.Consumer>
    </div>
  );
}

export default connect(
  state => ({}),
  {
    getPlayListAction: getPlayListAction,
  }
)(SongListBlock)

