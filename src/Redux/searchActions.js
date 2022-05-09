// action 为一个 对象 → 同步action
// action 为一个函数 → 异步action
// 因为函数里面能开启异步任务

import axios from "axios"
import store from "./store";
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频,
const TYPE = {
  'songs':1,
  'artists':100,
  'albums':10,
  'videos':1014,
  'songlists':1000,
  'lyrics':10,
  'users':1002,
}
axios.defaults.baseURL = 'https://netease-cloud-music-api-tawny-nine.vercel.app/'
axios.defaults.withCredentials = true
// export const createSearchAction = (type, data) => ({type,data});
// 异步任务会被传入一个 dispatch 参数供使用
export const createSearchAction = (type, data) => {
  console.log('dispatch reach', type, data)
  return async (dispatch) => {
    console.log('await')
    let res = await axios('/search',{
      params:{keywords:data,type:TYPE[type]}});
    console.log('await done', res)
    
    dispatch({
      type: 'updateData',
      data: {
        type: type,
        data: res.data.result
      }
    })
      
  }
}

export const getMvAction = (id, duration) =>{
  return async (dispatch) => {
    let res = await axios(`/video/url?id=${id}`)
    dispatch({type:'watchMV', data:{video:res.data.urls[0], duration}})
  }
}

export const loginAction = (phone, password) => {
  return async (dispatch) => {
    
    let res = await axios(`/login/cellphone?phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`,{
      withCredentials: true,
    })
    console.log(res.data);

    // 未登录成功
    if(res.status != 200) {
      console.log("未登录成功")
      dispatch({type:'login',data:{user:null, detail:null, playlist:null}});
      return;
    }
    // 登录成功
    console.log("登录成功")
    const {account:{vipType, id}, cookie, profile} = res.data;
    let detail = await axios(`/user/detail?uid=${id}`);
    let playlist = await axios(`/user/playlist?uid=${id}`);
    let likedList = await axios(`/likelist?uid=${id}`);
    let loginState = await axios('/login/status');

    console.log('loginState', loginState);
    console.log('detail', detail);
    console.log('playlist', playlist);
    dispatch({type:'login', data: {user:profile, detail:profile, playlist:playlist.data.playlist, likedList:likedList.data.ids}})
  }
}
export const getLoginStateAction = () => {
  return async (dispatch) => {
    let res = await axios('/login/status');
    console.log("loginState", res);
    const {account:{id}, profile} = res.data.data;

    let playlist = await axios(`/user/playlist?uid=${id}`);
    let likedList = await axios(`/likelist?uid=${id}`);

    dispatch({type:'login', data: {user:profile, detail:profile, playlist:playlist.data.playlist, likedList:likedList.data.ids}})
  }
}
export const getUserDetail = (uid) => {
}
export const logoutAction = () => {
  return async (dispatch) => {
    let res = await axios('/logout');
    console.log(res);
    dispatch({type:'logout',data:null})
  }
}
// 获取歌单信息
export const getPlayListAction = (lid) => {
  return async (dispatch) => {
    console.log('id', lid);
    let res = await axios(`/playlist/detail?id=${lid}`);
    console.log("playlist detail", res)
    dispatch({type:'getPlayListAction', data: res.data.playlist})
  }
}
// 获取歌单的所有歌曲
export const getPlayListSongsAction = (lid) => {
  return async (dispatch) => {
    console.log('!!!!!!!lid', lid);
    let res = await axios(`/playlist/track/all?id=${lid}`);
    console.log('Playlistsongs', res);
    dispatch({type:'getPlayListSongs', data:res.data.songs})
  }
}

