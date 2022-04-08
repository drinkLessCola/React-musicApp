import React, { Component } from 'react'
import './index.css'
import LogOutAvatar from '../../Icons/LogOutAvatar'
import { connect } from 'react-redux';
class User extends Component {
  render() {
    const {username = '未登录', avatar = null} = this.props;
    return (
      <div className='User'>
        <div className='User-avatar'>
          {avatar ?<img 
          src={``} 
          alt='user'></img>:<LogOutAvatar></LogOutAvatar>}
        </div>
        <div className='User-name'>{username}</div>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {}
)(User)