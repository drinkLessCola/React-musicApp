import React, { Component } from 'react'
import { connect } from 'react-redux';
import User from '../User';
import HandleWin from './HandleWin';
import './index.css'
import Search from './Search';
// 获取 Redux 中保存的状态
// import store from '../../Redux/store'
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {user} = this.props;
    return <div className="Header">
      <Search/>
      <User user={user}/>
      <HandleWin/>
    </div>;
  }
}

export default connect(
  state => ({user:state.user}),
  {}
)(Search)