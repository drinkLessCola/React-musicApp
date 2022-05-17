import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../../Redux/store';
import './index.css';
function PlayListBoard(props){
  function timeFormat(time){
    time /= 1000;
    let min = Math.floor(time / 60),
      sec = time % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }
  const {songList} = props;
  console.log('songList', songList)
  console.log('--------PLAYLISTBOARD render---------')
  return (
      <div className='PlayListBoard'>
        <div className="PlayListBoard-header">
          <h1>当前播放</h1>
          <div className="PlayListBoard-info">
            <span>总100首</span>
            <span className='PlayListBoard-info-btns'>
              <button>收藏全部</button>
              <button>清空列表</button>
            </span>
          </div>
        </div>
        <table className='PlayListBoard-main'>
            <tbody>
              {songList.map(s=> (
                <tr key={s.id}>
                  <td className='PlayListBoard-name list-name'>{s.name}</td>
                  <td className='PlayListBoard-artists'>{
                    s.ar.map((artist) =><a>{artist.name}</a>)
                  }</td>
                  <td className='list-time'>{timeFormat(s.dt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    )
}

export default connect((state) => 
  ({
    songList:state.songList
  }),
  {

  }
)(PlayListBoard)