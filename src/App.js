import React, { useEffect, useRef } from 'react'
import SideBar from './Component/SideBar';
import Bottom from './Component/Bottom';
import Header from './Component/Header';
import Main from './Component/Main';
import Login from './Component/Login';
import PlayerPage from './Component/PlayerPage'

import './App.css'
import { connect } from 'react-redux';
import { getLoginStateAction } from './Redux/searchActions';

import ThemeContext from './Context/ThemeContext';
import MenuContext from './Context/MenuContext';
import Menu from './Component/Menu';

function App(props) {
  console.log('--------APP render---------')
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
 
  const user = localStorage.getItem('user');
  console.log(user);

  const [theme, setTheme] = React.useState('light')
  const [showContextMenu, setShowContextMenu] = React.useState(false)
  const [coord, setCoord] = React.useState({x:0, y:0})
  const [menuItems, setMenuItems] = React.useState(null);
  const menu = useRef(null);
  const MemoMenu = React.useMemo(() => <Menu ref={menu}>{menuItems}</Menu>,[menuItems])
  
  useEffect(() => {
    console.log(menu)
    console.log(MemoMenu)
    console.log(showContextMenu);
    if(menu.current){
      menu.current.style.left = coord.x + 'px';
      menu.current.style.top = coord.y + 'px';
    }
  },[showContextMenu, coord]);
 
  /**
   * 修改主题模式
   */
   const toggleTheme = () => {
    console.log('【toggleTheme】')
    document.body.dataset.theme = (theme === 'dark')? 'light':'dark';
    setTheme(oldTheme => (oldTheme === 'dark')? 'light' : 'dark');
  }
  /**
   * 显示右键菜单
   */
  function toggleMenu (menuItems, e){
    e.preventDefault();
    setShowContextMenu(true);
    setCoord({
      x:e.clientX,
      y:e.clientY
    })
    setMenuItems(menuItems);
  }
  function showPlayList() {
    const { isPlayListShowing } = state;
    setState({
      isPlayListShowing: !isPlayListShowing,
    });
  }
  function showLogin(){
    setState({showLogin:true});
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
  console.log(state.showLogin)
  // React.useState
  return (
    <div className="App" onClick={handleClick}>
      <ThemeContext.Provider value={{toggleTheme}}>
        {React.useMemo(() => <Header showLogin={showLogin}/>,[props.loginState])}
      </ThemeContext.Provider>
      <MenuContext.Provider value={{toggleMenu}}>
        <div className="main">
          {React.useMemo(() => <SideBar list={props.playlist} /> ,[props.playList])}
          <Main />
        </div>
      </MenuContext.Provider>
      {React.useMemo(() => <Bottom
        showPlayList={showPlayList}
        changeMode={changeMode}
        mode={state.mode}
        songSrc={state.songSrc}
      />, [])}
      <PlayerPage />
      {state.showLogin && <Login></Login>}
      {showContextMenu && MemoMenu}
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