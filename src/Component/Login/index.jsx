import React, { Component } from 'react'
import './index.css'
import loginPic from '../../imgs/login.png';
export default class Login extends Component {
  render() {
    return (
      <div>
        <div className='Login'>
          <div className="Login-img">
          <img src={loginPic}></img>
          </div>
          <form className='Login-form'>
            <div className='Login-input'>
              <div className='tr'>
                <select className='addRightBorder'>
                  <option value='+86'>+86</option>
                </select>
                <input placeholder='请输入手机号' type='tel'></input>
              </div>
              <div className='tr'>
                <input type='password' placeholder='请输入密码' />
              </div>
            </div>
            <div className='tr'>
              <input type='checkbox' value='autoLogin' />自动登录
            </div>
            <button>登录</button>
          </form>
          <a href='#' className='register'>注册</a>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className='tr'>
            <input type='checkbox'></input>同意
            <a href='#'>《服务条款》</a>
            <a href='#'>《隐私政策》</a>
            <a href='#'>《儿童隐私政策》</a>
          </div>
        </div>
        <div className='Login-shadow'></div>
      </div>
    )
  }
}
