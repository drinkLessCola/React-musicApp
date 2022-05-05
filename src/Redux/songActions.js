import axios from 'axios';

axios.defaults.baseURL = 'https://netease-cloud-music-api-tawny-nine.vercel.app/'
axios.defaults.withCredentials = true

// export const getLikedSongsList = (uid) => {
//   return async (dispatch) => {
//     let res = await axios(`/likelist?uid=${uid}`)
//     console.log(res);
//   }
// }
// 添加一首歌到播放列表
export const addNewSongAction = (data) => {
  return async (dispatch) => {
    let res = await axios(`/song/detail?ids=${data}`);
    dispatch({type:'addSong', data:res.data.songs[0]})
  }
}

export const getLyricAction = (id) => {
  return async (dispatch) => {
    let res = await axios(`/lyric?id=${id}`);
    console.log('lyric', res);
  }
}

// 添加整个歌单到播放列表
export const replaceListAction = (songs, id) => {
  return {
    type:'replaceList',
    data:{songs, id}
  }
}

// 播放下一首
export const next = () => {
  return {
    type:"next",
  }
}
export const prev = () => {
  return {
    type:"prev",
  }
}