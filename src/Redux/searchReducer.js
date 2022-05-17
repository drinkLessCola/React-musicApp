// 纯函数

/**
 * 
 * @param {*} preState 之前的状态
 * @param {*} action 动作对象
 */
const initState = {
  songList: [],
  curIdx: 0,
  song: null,
  lyric: [],
  video: null,
  playerPageOpen: false,
  user: {
    loginState: false,
    user: null,
    detail: null,
    playlist: []
  },
  playlist: {
    songs: []
  },
  home: {
    banners: [],
    dailyRecommendList: []
  },
  curTime: 0
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
    case 'banner':
      return Object.assign({}, preState, {
        home: Object.assign({}, preState.home, {
          banners: data
        })
      })
    case 'dailyRecommendList':
      return Object.assign({}, preState, {
        home: Object.assign({}, preState.home, {
          dailyRecommendList: data
        })
      })
    case 'addSong':
      const { songList, curIdx } = preState;
      console.log('addSong', songList, data);
      // 这两句要分开写！！
      let newSongList = Array.from(songList)
      newSongList.filter(l => l.id !== data.id)
      newSongList.splice(curIdx, 0, data.song);

      console.log('#', newSongList)
      return Object.assign({}, preState,
        {
          songList: newSongList,
          curIdx: curIdx + 1,
          song: data.song,
          lyric: data.lyric
        });
    case 'replaceList': return Object.assign({}, preState,
      {
        songList: data.songs,
        curIdx: data.id,
        song: data.songs[data.id]
      })
    case 'watchMV': return Object.assign({}, preState, {
      video: data.video,
      duration: data.duration
    });
    case 'login': return Object.assign({}, preState, {
      user: {
        loginState: data.loginState,
        user: data.user,
        detail: data.detail,
        playlist: data.playlist
      },
      likedList: data.likedList
    });
    case 'loginState': return Object.assign({}, preState, {
      isLogin: data,
    });
    case 'getPlayListAction': return Object.assign({}, preState, {
      playlist: Object.assign({}, preState.playlist, {
        name: data.name,
        coverImgUrl: data.coverImgUrl,
        tags: data.tags,
        creator: data.creator,
      }),
    })
    case 'getPlayListSongs': return Object.assign({}, preState, {
      playlist: Object.assign({}, preState.playlist, {
        songs: data,
      })
    });
    case 'getSinger': ; break;
    case 'getAlbums': ; break;
    case 'shift': return Object.assign({}, preState, {
      curIdx: data.idx,
      song: preState.songList[data.idx],
      lyric:data.lyric
    });
    case 'togglePlayerPage': return Object.assign({}, preState, {
      playerPageOpen: !preState.playerPageOpen,
    });
    case 'lyric': return Object.assign({}, preState, {
      lyric: data
    });
    case 'updateCurTime':
      console.log('timer', data);
      return Object.assign({}, preState, {
        curTime: data
      });
    default:
      return preState;
  }
}