import axios from 'axios'
export const togglePlayerPageAction = (id, open) => {
  return async (dispatch) => {
    let res = await axios(`/lyric?id=${id}`);
    console.log('lyric', res.data);
    dispatch({
      type: 'togglePlayerPage',
      data: {
        // 获取歌词
        lyric: res.data.lrc.lyric,
        playerPageOpen:!open
      }
    })
  }
}
