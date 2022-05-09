import React, { Component, useEffect } from 'react'
import Songs from './Songs';
import User from '../../User';
import PlayIcon from '../../../Icons/PlayIcon';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlayListAction, getPlayListSongsAction} from '../../../Redux/searchActions';
import { replaceListAction } from '../../../Redux/songActions'
import './index.css';


function SongListPage(props) {
  console.log("newSongListPage")

  const params = useParams();
  const listId = params.listid;
  console.log("listId" , params, listId);

  useEffect(()=>{
    props.getPlayListInfo(listId)
    props.getSongs(listId)
  },[listId])

  const replaceList = function(e){
    const target = e.target.closest('tr');
    console.log('dblClick', target)
    props.replaceList(props.songs, target.id)
  }

  const playAll = function(){
    props.replaceList(props.songs, 0)
  }
  return (
    <div className="SongListPage">
      <div className="SongListPageInfo">
        <div className="SongListPageInfo-img">
          <img src={props.playlist.coverImgUrl} />
        </div>
        <div className="SongListPageInfo-info">
          <h1>{props.playlist.name}</h1>
          <div className='SongListPageInfo-user'>
            <User />
          </div>
          <div className="SongListPageFunc">
            <button onClick={playAll}>
              <PlayIcon />
              播放全部
            </button>
            <button title="添加全部到播放列表">+</button>
            <button>收藏</button>
            <button>分享</button>
            <button>下载全部</button>
          </div>
          {/* <div className="SongListPageInfo-intro">{intro}</div> */}
        </div>
      </div>
      <div className="SongListPageDetail">
        <ul className="SongListPage-tab">
          <li><button>歌曲列表</button></li>
          <li><button>评论</button></li>
        </ul>
        { <Songs songs={props.songs} replaceList={replaceList}/> }
      </div>
    </div>
  );
}

export default connect(
  state =>  ({
    playlist:state.playlist,
    songs:state.playlist.songs
  }),
  {
    getSongs:getPlayListSongsAction,
    getPlayListInfo:getPlayListAction,
    replaceList:replaceListAction,
  }
  )(SongListPage)