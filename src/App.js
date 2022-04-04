import React, { Component } from 'react'
import SideBar from './Component/SideBar';
import Bottom from './Component/Bottom';
import Header from './Component/Header';
import Main from './Component/Main';
import Login from './Component/Login';
import SongListPage from './Component/Main/SongListPage';
import './App.css'
import {Route, Switch, Redirect } from 'react-router-dom';
import PlayListBoard from './Component/PlayListBoard';
import SearchResPage from './Component/Main/SearchResPage';
import { withRouter } from 'react-router-dom';


export default class App extends Component {
  state = {
    isPlayListShowing: false,  // 显示播放列表
    songListCurIdx: 1,         // 播放到了歌单的哪一首
    mode: 0,                   // 播放模式，0：列表循环 1：单曲循环 2：随机循环 3：顺序循环
    songSrc:'',
    login:false,
  }
  data = {
    selectedList: 0,

    list: [{
      listName: "我喜欢的音乐",
      path: '/0001',
      id: '0001',
    }, {
      listName: "夜凉不寐，月色如水",
      path: '/0002',
      id: '0002',
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
          imageSrc:"https://img0.baidu.com/it/u=2928837390,1445198898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
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
  showPlayList = () => {
    const { isPlayListShowing } = this.state;
    this.setState({
      isPlayListShowing: !isPlayListShowing,
    });
  }
  changeSong = (num) => {
    const index = this.state.songListCurIdx;
    const listLength = this.data.playList.songs.length;
  
    if(this.state.mode === 2){
      num = Math.floor(Math.random() * (listLength - 2) + 1);
    }
    let newIdx = (index + num) % listLength;
    console.log(index,newIdx)
    this.setState({
      songListCurIdx:newIdx,
    })
  }
  changeMode = (event) => {
    const { mode } = this.state;
    this.setState({
      mode: (mode + 1) % 4,
    })
    event.preventDefault();
    event.stopPropagation();
  }
  handleClick = (event) => {
    const target = event.target.closest('.PlayListBoard');
    if (target || !this.state.isPlayListShowing) return;
    this.setState({
      isPlayListShowing: false,
    });
  }
  getSong = (event) => {
    const musicFile = event.target.files[0];
    let url = URL.createObjectURL(musicFile);
    this.setState({
      songSrc:url,
    })
  }
  render() {
    return (
      <div className="App" onClick={this.handleClick}>
        {/* <audio src='..\..\resource\Sea, Swallow Me.mp3' type="audio/mp3" controls="controls"></audio> */}
        <Header login={this.state.login}/>
        <div className="main">
          <SideBar list={this.data.list} />
          <Main>
            <Switch>
              <Route path={`/songlist/:listid`} component={SongListPage} ></Route>
              <Route path={`/s`} component={SearchResPage}></Route>
              <Redirect to='/songlist/0001'></Redirect>
            </Switch>
          </Main>
          {this.state.isPlayListShowing && <PlayListBoard list={this.data.playList} />}
        </div>
        <Bottom
          song={this.data.playList.songs[this.state.songListCurIdx]}
          showPlayList={this.showPlayList}
          changeSong={this.changeSong}
          changeMode={this.changeMode}
          mode={this.state.mode}
          songSrc={this.state.songSrc}
        />

        {/* <Login></Login> */}
      </div>
    );
  }
}



