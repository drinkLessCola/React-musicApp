// 纯函数

/**
 * 
 * @param {*} preState 之前的状态
 * @param {*} action 动作对象
 */
const initState = {
  songList: [],
  curIdx: 0,
  song:null
};
// preState == undefined 初始化
export default function searchReducer(preState = initState, action) {
  console.log(preState, action)
  const { type, data } = action;
  switch (type) {
    case 'updateData':
      return Object.assign({}, preState,
        {
          [data.type]: data.data[data.type],
        })
    case 'addSong':
      const { songList, curIdx } = preState;
      console.log('addSong', songList , data);
      // 这两句要分开写！！
      let newSongList = Array.from(songList)
      newSongList.splice(curIdx, 0, data);

      console.log('#', newSongList)
      return Object.assign({}, preState,
        {
          songList: newSongList,
          curIdx: curIdx + 1,
          song:data
        });
    case 'getSinger': ; break;
    case 'getAlbums': ; break;
    default:
      return preState;
  }
}