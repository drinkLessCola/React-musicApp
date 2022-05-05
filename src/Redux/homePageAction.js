import axios from 'axios'

axios.defaults.baseURL = 'https://netease-cloud-music-api-tawny-nine.vercel.app/'
axios.defaults.withCredentials = true

export const getBannerAction = () => {
  return async (dispatch) => {
    let res = await axios('/banner');
    console.log(res);
    dispatch({type:'banner', data:res.data.banners})
  }
}
export const getDailyRecommendListAction = () => {
  return async (dispatch) => {
    let res = await axios('/recommend/resource');
    console.log(res);
    dispatch({type:'dailyRecommendList', data:res.data.recommend})
  }
}