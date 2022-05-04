// 纯函数

/**
 * 
 * @param {*} preState 之前的状态
 * @param {*} action 动作对象
 */
const initState = {
  songList: [],
  curIdx: 0,
  song:null,
  video:null,
  user:{
    loginState:false,
    user:null,
    detail:null,
    playlist:[]
  },
  playlist:{
    songs:[]
  }
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
          song:data,
        });
    case 'replaceList': return Object.assign({},preState,
      {
        songList:data.songs,
        curIdx:data.id,
        song:data.songs[data.id]
      })
    case 'watchMV':return Object.assign({},preState,{
      video:data.video,
      duration:data.duration
    });
    case 'login':return Object.assign({}, preState, {
      user:{
        loginState:data.loginState,
        user:data.user,
        detail:data.detail,
        playlist:data.playlist
      }
    });
    case 'loginState':return Object.assign({}, preState, {
      isLogin:data,
    });
    case 'getPlayListAction': return Object.assign({}, preState, {
      playlist:Object.assign({}, preState.playlist,{
        name:data.name,
        coverImgUrl:data.coverImgUrl,
        tags:data.tags,
        creator:data.creator,
      }),
    })
    case 'getPlayListSongs': return Object.assign({}, preState, {
      playlist:Object.assign({}, preState.playlist, {
        songs:data,
      })
    });
    case 'getSinger': ; break;
    case 'getAlbums': ; break;
    case 'prev': return Object.assign({}, preState, {
      curIdx:(+preState.curIdx) - 1,
      song:preState.songList[
        +preState.curIdx - 1]
    });
    case 'next': return Object.assign({}, preState, {
      curIdx:(+preState.curIdx) + 1,
      song:preState.songList[
        +preState.curIdx + 1]
    })
    default:
      return preState;
  }
}