import React from 'react'
import './index.css'
import loginPic from '../../imgs/login.png';
import { getLoginStateAction, loginAction, logoutAction } from '../../Redux/searchActions';
import { connect } from 'react-redux';
function Login(props){
  let phone, password;
  function login(e){
      e.preventDefault();
      console.log("login")
      const storage = window.localStorage;
      const phoneValue = phone.value;
      const passwordValue  = password.value;
      props.loginAction(phoneValue, passwordValue)
      // props.getLoginStateAction();
      // props.logOut();
      storage.setItem("user",JSON.stringify({phone:phoneValue, password:passwordValue}))
    }
    function logout(e){
      e.preventDefault();
      console.log("logout")
      props.logoutAction()
    }
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
                <input ref={(i)=>phone = i} placeholder='请输入手机号' type='tel'></input>
              </div>
              <div className='tr'>
                <input ref={(i)=>password = i}type='password' placeholder='请输入密码' />
              </div>
            </div>
            <div className='tr'>
              <input type='checkbox' value='autoLogin' />自动登录
            </div>
            <button onClick={login}>登录</button>
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


export default connect(
  state => ({res:state.res}),
  {
    loginAction:loginAction,
    getLoginStateAction:getLoginStateAction,
    logoutAction:logoutAction
  }
)(Login)