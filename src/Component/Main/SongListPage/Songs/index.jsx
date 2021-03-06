import React, { Component } from 'react'
import { connect } from 'react-redux';
import Liked from '../../../../Liked';
import MenuContext from '../../../../Context/MenuContext';
import './index.css'

/* 菜单项 */
const menuItems = (<ul>
  <li data-func="play">播放</li>
  <li data-func="playNext">下一首播放</li>
  <li data-func="collectToList">收藏到歌单</li>
</ul>)

function Songs(props) {
  console.log('--------MAIN -> SONGS render---------')
  const timeFormat = function (time) {
    time = Math.floor(time / 1000);
    let min = Math.floor(time / 60),
      sec = time % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }
  console.log(props.likedSongs);
  console.log("Songs",props);
  const { songs, replaceList } = props;
  const [menuHandleId, setMenuHandleId] = React.useState(null)


  return (
    <table className="SongListPageSongs">
      <thead>
        <tr>
          <th className='list-idx'></th>
          <th className='list-func'>操作</th>
          <th className='list-name'>标题</th>
          <th className='list-artists'>歌手</th>
          <th className='list-album'>专辑</th>
          <th className='list-time'>时间</th>
        </tr>
      </thead>
      <MenuContext.Consumer>
        {({toggleMenu}) => (
          <tbody onDoubleClick={replaceList} onContextMenu={toggleMenu.bind(null,menuItems)}>{
            songs && songs.map((s, idx) => (
              <tr key={idx} id={idx}>
                <td className='list-idx'>{((idx < 9) ? "0" : "") + (idx + 1)}</td>
                <td className='list-func'>
                  <Liked like={props.likedSongs.has(s.id)} />
                </td>
                <td className='list-name'>{s.name}</td>
                <td className='list-artists'>{s.ar.reduce((res, a) => (res == '' ? '' : res + ' / ') + a.name, "")}</td>
                <td className='list-album'>{s.al.name}</td>
                <td className='list-time'>{timeFormat(s.dt)}</td>
              </tr>
            ))
          }</tbody>
        )}
      </MenuContext.Consumer>
    </table>
  );
}

export default connect(
  (state)=>({
    likedSongs:new Set(state.likedList)
  }),
  {

  }
)(Songs)