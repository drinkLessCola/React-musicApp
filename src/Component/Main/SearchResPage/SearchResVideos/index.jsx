import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './index.css';
class SearchResVideos extends Component {

  timeFormat(time) {
    time /= 1000;
    let min = Math.floor(time / 60),
      sec = time % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }
  watchVideo = (e) =>{
    const vid = e.target.closest('.video').id;
    this.props.history.puah('')
  }
  render() {
    let { videos } = this.props;
    videos = videos || [];
    console.log('Resvideos', videos, videos.length);
    return (
      <div className='SearchResVideos'>
        {videos.length ?
          videos.map(v => (
            <div className='video' key={v.vid} id={v.vid}>
              <div className='video-cover' onClick={this.watchVideo}>
                <img src={v.coverUrl}></img>
              </div>
              <div className='video-info'>
              <div className='video-title'>{v.title}</div>
              <div className='video-creator'>{v.creator.map(c => <span id={c.userId}>{c.userName}</span>)}</div>
              </div>
            </div>
          ))
          :
          <div>加载中...</div>}
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({videos:state.videos}),
  {}
)(SearchResVideos));