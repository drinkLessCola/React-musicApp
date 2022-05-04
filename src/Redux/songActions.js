import axios from 'axios';

axios.defaults.baseURL = 'https://netease-cloud-music-api-tawny-nine.vercel.app/'
axios.defaults.withCredentials = true
// 添加一首歌到播放列表
export const addNewSongAction = (data) => {
  return async (dispatch) => {
    let res = await axios(`/song/detail?ids=${data}`);
    dispatch({type:'addSong', data:res.data.songs[0]})
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