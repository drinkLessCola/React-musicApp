import React, { useCallback } from 'react'
import './index.css'
import PlayIcon from '../../Icons/PlayIcon'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPlayListSongsAction } from '../../Redux/searchActions';
import { useRoutes } from 'react-router-dom';

export default function Card(props) {
  const {picUrl, name, id} = props;
  const navigate = useNavigate()

  const enterSongList = useCallback(()=>{
    navigate(`/songlist/${id}`)
  },[])
  return (
    <div className='card' onClick={enterSongList} id={id}>
      <div className='card-img'>
        <img src={picUrl}></img>
        <button className='card-play-btn'>
          <PlayIcon></PlayIcon>
        </button>
      </div>
      <label className='card-info' htmlFor={id}>
        <p className='card-title'>{name}</p>
        <p className='card-author'></p>
      </label>
    </div>
  )
}
// export default connect(
//   (state) => {},
//   {
//     getPlayListSongs:getPlayListSongsAction,
//   }
// )(Card);