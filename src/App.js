import React, { useEffect } from 'react'
import SideBar from './Component/SideBar';
import Bottom from './Component/Bottom';
import Header from './Component/Header';
import Main from './Component/Main';
import Login from './Component/Login';
import PlayerPage from './Component/PlayerPage'

import './App.css'
import PlayListBoard from './Component/PlayListBoard';
import { connect } from 'react-redux';
import { getLoginStateAction } from './Redux/searchActions';



function App(props) {
  const [state, setState] = React.useState({
    isPlayListShowing: false,  // 显示播放列表
    songListCurIdx: 1,         // 播放到了歌单的哪一首
    mode: 0,                   // 播放模式，0：列表循环 1：单曲循环 2：随机循环 3：顺序循环
    songSrc: '',
    loginState: null,
    showLogin:false,
  });

  useEffect(() => {
    const res = (async() => {
      return await props.getLoginState();
    })();
    console.log('res', res)
  },[]);

  console.log(state, setState)
  const user = localStorage.getItem('user');
  console.log(user);
  const data = {
    selectedList: 0,

    list: [{
      listName: "我喜欢的音乐",
      path: '/1',
      id: '1',
    }, {
      listName: "夜凉不寐，月色如水",
      path: '/2',
      id: '2',
      // info: {
      //   name: "未命名",
      //   intro: "简介",
      //   imgSrc:
      //     "https://img0.baidu.com/it/u=2928837390,1445198898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      // },
    }],
    playList: {

      songs: [
        {
          id: 1,
          name: "Crying",
          singer: "Still Corners",
          album: "Crying",
          time: 208,
          like: false,
          imageSrc: "https://img0.baidu.com/it/u=2928837390,1445198898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        },
        {
          id: 2,
          name: "Sea, Swallow Me",
          singer: "Cocteau Twins / Harold Budd",
          album: "The Moon and the Melodies",
          time: 189,
          imageSrc: "https://y.qq.com/music/photo_new/T002R300x300M000001mZMtj15CO0z_2.jpg?max_age=2592000",
          like: true,
        },
        {
          id: 3,
          name: "The Ghost Has No Home",
          singer: "Cocteau Twins / Harold Budd",
          album: "The Moon and the Melodies",
          time: 455,
          imageSrc: "https://y.qq.com/music/photo_new/T002R300x300M000001mZMtj15CO0z_2.jpg?max_age=2592000",
          like: true,
        },
        {
          id: 4,
          name: "堕落",
          singer: "王菲",
          album: "浮躁",
          time: 222,
          imageSrc: "https://y.qq.com/music/photo_new/T002R300x300M0000002oEts1trJQd_4.jpg?max_age=2592000",
          like: false,
        }
      ]

    },
  };

  function showPlayList() {
    const { isPlayListShowing } = state;
    setState({
      isPlayListShowing: !isPlayListShowing,
    });
  }
  function showLogin(){
    setState({showLogin:true});
  }
  function changeSong(num) {

    const index = state.songListCurIdx;
    const listLength = data.playList.songs.length;

    if (state.mode === 2) {
      num = Math.floor(Math.random() * (listLength - 2) + 1);
    }
    let newIdx = (index + num) % listLength;
    console.log(index, newIdx)
    setState({
      songListCurIdx: newIdx,
    })
  }
  function changeMode(event) {

    const { mode } = state;
    setState({
      mode: (mode + 1) % 4,
    })
    event.preventDefault();
    event.stopPropagation();
  }
  function handleClick(event){
    const target = event.target.closest('.PlayListBoard');
    if (target || !state.isPlayListShowing) return;
    setState({
      isPlayListShowing: false,
    });
  }
  function getSong(event){
    console.log('e')
    const musicFile = event.target.files[0];
    let url = URL.createObjectURL(musicFile);
    setState({
      songSrc: url,
    })
  }
  console.log(state.showLogin)
  // React.useState
  return (
    <div className="App" onClick={handleClick}>
      <Header showLogin={showLogin} />
      <div className="main">
        <SideBar list={props.playlist} />
        <Main>
        </Main>
        {state.isPlayListShowing && <PlayListBoard list={data.playList} />}
      </div>
      <Bottom
        song={data.playList.songs[state.songListCurIdx]}
        showPlayList={showPlayList}
        changeSong={changeSong}
        changeMode={changeMode}
        mode={state.mode}
        songSrc={state.songSrc}
      />
      <PlayerPage />
      {state.showLogin && <Login></Login>}
    </div>
  );

}




// 花括号外层要包裹小括号
export default connect(
  state => ({
    loginState:state.loginState,
    detail:state.detail,
    playlist:state.playlist,
  }),
  {
    getLoginState:getLoginStateAction
  }
)(App)