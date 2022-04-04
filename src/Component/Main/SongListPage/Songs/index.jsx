import React, { Component } from 'react'
import Liked from '../../../../Liked';
export default class Songs extends Component {
  timeFormat(time) {
    let min = Math.floor(time / 60),
      sec = time % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }
  render() {
    console.log(this.props);
    const { songs } = this.props.location.state;
    return (
      <table className="SongListPageSongs">
        <thead>
          <tr>
            <th></th>
            <th>操作</th>
            <th>标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>{
          songs.map((s, idx) => (
            <tr key={idx}>
              <td className='list-idx'>{"0" + (idx + 1)}</td>
              <td>
                <Liked like={s.like} />
              </td>
              <td className='list-name'>{s.name}</td>
              <td>{s.singer}</td>
              <td>{s.album}</td>
              <td className='list-time'>{this.timeFormat(s.time)}</td>
            </tr>
          ))
        }</tbody>
      </table>
    );
  }
}
