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
    let lyric = await axios(`/lyric?id=${res.data.songs[0].id}`);
    let lyricArr = lyric.data.lrc.lyric.split('\n').map((l) => {
      let [time, text] = l.split(']');
      let [min, sec] = time.split(':');
      min = parseInt(min);
      sec = Math.floor(parseFloat(sec));
      return {
        text,
        time: min * 60 + sec
      }
    });
    dispatch({ type: 'addSong', data: { song: res.data.songs[0], lyric: lyricArr } })
  }
}

export const getLyricAction = (id) => {
  return async (dispatch) => {
    let res = await axios(`/lyric?id=${id}`);
    console.log('lyric', res);
  }
}

// 添加整个歌单到播放列表
// 使用 reduce 来实现在 map 时过滤元素
export const replaceListAction = (songs, id) => {
  return async (dispatch) => {
    let lyric = await axios(`/lyric?id=${songs[id].id}`);
    let lastTime = 0;
    let lyricArr = lyric.data.lrc.lyric.split('\n').reduce((resArr, l) => {
      if (l == '') return resArr;
      console.log("#", l);
      let [t, text] = l.split(']');
      t = t.slice(1);
      let [min, sec] = t.split(':');
      min = parseInt(min);
      sec = Math.floor(parseFloat(sec));
      const time = min * 60 + sec;
      if (time >= lastTime) {
        console.log('√')
        lastTime = time;
        resArr.push({ text, time });
      }
      return resArr
    },[]);
    dispatch(replaceAction(songs, id))
    dispatch({ type: 'lyric', data: lyricArr })
  }
}
export const replaceAction = (songs, id) => {
  return {
    type: 'replaceList',
    data: { songs, id }
  }
}

// 切换播放
export const shiftAction = (newIdx, id) => {
  return async (dispatch) => {
    let lyric = await axios(`/lyric?id=${id}`);
    let lyricArr = lyric.data.lrc.lyric.split('\n').map((l) => {
      if (l == '') return;
      console.log("#", l);
      let [time, text] = l.split(']');
      time = time.slice(1);
      let [min, sec] = time.split(':');
      min = parseInt(min);
      sec = Math.floor(parseFloat(sec));
      console.log(min, sec)
      return {
        text,
        time: min * 60 + sec
      }
    });
    dispatch({ type: "shift", data: { lyric: lyricArr, idx: newIdx } })
  }
}

export const updateCurTimeAction = (cur) => {
  return {
    type: "updateCurTime",
    data: cur
  }
}