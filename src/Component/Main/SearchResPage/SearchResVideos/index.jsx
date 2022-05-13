import React, { Component } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMvAction } from '../../../../Redux/searchActions';
import './index.css';
function SearchResVideos(props) {
  console.log('--------MAIN -> SEARCHRESVIDEOS render---------')
  const navigate = useNavigate();

  function timeFormat(time) {
    time /= 1000;
    let min = Math.floor(time / 60),
      sec = time % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }
  function watchVideo(e) {
    const video = e.target.closest('.video');
    const vid = video.id;
    const duration = video.dataset.duration;
    console.log(vid);
    props.getMV(vid, duration);
    navigate(`/mv?vid=${vid}`);
  }

  let { videos } = props;
  videos = videos || [];
  console.log('Resvideos', videos, videos.length);
  return (
    <div className='SearchResVideos'>
      {videos.length ?
        videos.map(v => (
          <div className='video' key={v.vid} id={v.vid} data-duration={v.durationms}>
            <div className='video-cover' onClick={watchVideo}>
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


export default connect(
  state => ({ videos: state.videos }),
  {
    getMV: getMvAction,
  }
)(SearchResVideos);