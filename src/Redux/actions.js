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
// export const createSearchAction = (type, data) => ({type,data});
// 异步任务会被传入一个 dispatch 参数供使用
export const createSearchAction = (type, data) => {
  console.log('dispatch reach', type, data)
  return async (dispatch) => {
    console.log('await')
    let res = await axios(`http://localhost:4000/search?keywords=${data}&&type=${TYPE[type]}`);
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

export const addNewSongAction = (data) => {
  return async (dispatch) => {
    let song = await axios(`http://localhost:4000/song/detail?ids=${data}`);
    dispatch({type:'addSong', data:song.data.songs[0]})
  }
}

export const getMvAction = (id) =>{
  return async (dispatch) => {
    let mv = await axios(`http://localhost:4000/mv/url?id=${id}`)
    dispatch({type:'openMvPage', data:mv})
  }
}

