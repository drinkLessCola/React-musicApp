import React, { Component } from 'react'
import { connect } from 'react-redux';
import './index.css';

class SearchResSingers extends Component {

  timeFormat(time) {
    time /= 1000;
    let min = Math.floor(time / 60),
      sec = time % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }
  render() {
    let {artists} = this.props;
    artists = artists || [];
    console.log('ResArtists',artists);
    return (
      <div className='SearchResArtists'>
        <table>
          <tbody>
            {artists.length ? artists.map(a => {
              return (
                <tr key={a.id}>
                  <td className='artistAvatar'>
                    <img src={a.img1v1Url}></img>
                  </td>
                  <td>{a.name}</td>
                </tr>
              )
            }) : <tr>加载中</tr>}
          </tbody>
        </table>
      </div>
    )
  }
}

// 要在 UI 组件定义之后才能 connect
export default connect(
  state => ({artists:state.artists}),
  {}
)(SearchResSingers);