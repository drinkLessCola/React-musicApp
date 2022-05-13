import React, { Component } from 'react'
import './index.css'
import LogOutAvatar from '../../Icons/LogOutAvatar'
import { connect } from 'react-redux';

export default function User(props){
  console.log('--------USER render---------')
    const {user = null} = props;
    console.log("User", user)
    return (
      <div className='User'>
        <div className='User-avatar'>
          {user ?<img 
          src={user.avatarUrl} 
          alt='user'></img>:<LogOutAvatar></LogOutAvatar>}
        </div>
        <div className='User-name'>{user?.nickname}</div>
      </div>
    )
  
}