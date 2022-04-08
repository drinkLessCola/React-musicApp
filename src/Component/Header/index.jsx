import React from 'react'
import { connect } from 'react-redux';
import User from '../User';
import HandleWin from './HandleWin';
import './index.css'
import Search from './Search';
// 获取 Redux 中保存的状态
// import store from '../../Redux/store'
function Header(props) {
  const [state, setState] = React.useState();
  const { user } = props;
  console.log("Header")
  function handleLogin(e){
    console.log("clickUser",e);
    props.showLogin();
  }

  return (<div className="Header" onClick={handleLogin}>
    <Search/>
    <User user={user} />
    <HandleWin />
  </div>);

}

export default connect(
  state => ({ user: state.user }),
  {}
)(Header)