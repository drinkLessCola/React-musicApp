import React, { Component, useEffect } from 'react'
import Songs from './Songs';
import { NavLink, } from 'react-router-dom';
import Comments from './Comments';
import User from '../../User';
import PlayIcon from '../../../Icons/PlayIcon';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlayListSongsAction } from '../../../Redux/searchActions';


function SongListPage(props) {
  console.log("newSongListPage")
  const data = {
    songList: [{
      listName: "夜凉不寐，月色如水",
      path: '/2',
      id: '2',
      info: {
        name: "未命名",
        intro: "简介",
        imgSrc:
          "https://img0.baidu.com/it/u=2928837390,1445198898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      },
      songs: [
        {
          name: "Crying",
          singer: "Still Corners",
          album: "Crying",
          time: 208
        },
        {
          name: "Sea, Swallow Me",
          singer: "Cocteau Twins / Harold Budd",
          album: "The Moon and the Melodies",
          time: 189,
          like: true,
        },
        {
          name: "The Ghost Has No Home",
          singer: "Cocteau Twins / Harold Budd",
          album: "The Moon and the Melodies",
          time: 455,
          like: true,
        },
        {
          name: "堕落",
          singer: "王菲",
          album: "浮躁",
          time: 222
        }
      ],
      comments: [
        {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'good',
          date: new Date(2022, 3, 24, 20, 45, 2),
        }
      ]
    }, {
      listName: "我喜欢的音乐",
      path: '/1',
      id: '1',
      info: {
        name: "未命名",
        intro: "简介",
        imgSrc:
          "https://y.qq.com/music/photo_new/T002R300x300M000001mZMtj15CO0z_2.jpg?max_age=2592000",
      },
      songs: [
        {
          name: "Sea, Swallow Me",
          singer: "Cocteau Twins / Harold Budd",
          album: "The Moon and the Melodies",
          time: 189,
          like: true,
        },
        {
          name: "The Ghost Has No Home",
          singer: "Cocteau Twins / Harold Budd",
          album: "The Moon and the Melodies",
          time: 455,
          like: true,
        },
      ],
      comments: [
        {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        },
        {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }, {
          userName: '孜然',
          avaturUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FZUVRSDF6U2FLSm9UQ1VINHRlRkxTNGVhM3R5SGJ5RWg0NVlKQkpMdHdCZU1TVjNRdEU4dDF3PT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg&refer=http%3A%2F%2Fimglf5.nosdn0.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649657796&t=8459925c8fed98ed69fe47bed0f503e5',
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo dolor, quibusdam quo nulla qui aspernatur modi quis illum excepturi iste! Nemo alias rerum maxime quibusdam reprehenderit dolor saepe id.',
          date: new Date(2022, 3, 25, 8, 0, 2),
        }
      ]
    }]

  }
  const params = useParams();
  const listId = params.listid;
  console.log("listId" , listId);

  useEffect(()=>{
    console.log('?')
      //使用这个id向服务器请求数据
      let res = (async() => await props.getSongs(listId))();
      console.log("@@@@", res);
  },[listId])

  // const list = data.songList.find((sl) => {
  //   return sl.id === listId;
  // })
  // console.log(list)
  // const {
  //   // info: { imgSrc, intro },
  //   // listName,
  //   // songs,
  //   id,
  //   comments
  // } = list;
  return (
    <div className="SongListPage">
      <div className="SongListPageInfo">
        <div className="SongListPageInfo-img">
          {/* <img src={imgSrc} /> */}
          <div className='BigHeart'>
            <svg t="1648190679462" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M981.714286 250.971429a297.188571 297.188571 0 0 0-65.028572-94.628572 302.171429 302.171429 0 0 0-96-63.428571A303.245714 303.245714 0 0 0 703.657143 69.714286c-56.342857 0-111.314286 15.428571-159.085714 44.571428-11.428571 6.971429-22.285714 14.628571-32.571429 22.971429-10.285714-8.342857-21.142857-16-32.571429-22.971429-47.771429-29.142857-102.742857-44.571429-159.085714-44.571428-40.571429 0-79.885714 7.771429-117.028571 23.2-35.885714 14.857143-68.228571 36.228571-96 63.428571a295.36 295.36 0 0 0-65.028572 94.628572c-15.885714 36.914286-24 76.114286-24 116.457142 0 38.057143 7.771429 77.714286 23.2 118.057143 12.914286 33.714286 31.428571 68.685714 55.085715 104 37.485714 55.885714 89.028571 114.171429 153.028571 173.257143 106.057143 97.942857 211.085714 165.6 215.542857 168.342857l27.085714 17.371429c12 7.657143 27.428571 7.657143 39.428572 0l27.085714-17.371429c4.457143-2.857143 109.371429-70.4 215.542857-168.342857 64-59.085714 115.542857-117.371429 153.028572-173.257143 23.657143-35.314286 42.285714-70.285714 55.085714-104 15.428571-40.342857 23.2-80 23.2-118.057143 0.114286-40.342857-8-79.542857-23.885714-116.457142z" fill="#ffffff"></path></svg>
          </div>
        </div>
        <div className="SongListPageInfo-info">
          {/* <h1>{listName}</h1> */}
          <div className='SongListPageInfo-user'>
            <User />
          </div>
          <div className="SongListPageFunc">
            <button>
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
        { <Songs songs={props.songs}/> }

      </div>
    </div>
  );
}

export default connect(
  state =>  ({songs:state.playlist.songs}),
  {
    getSongs:getPlayListSongsAction
  }
  )(SongListPage)