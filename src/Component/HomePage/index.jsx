import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getBannerAction, getDailyRecommendListAction } from '../../Redux/homePageAction';
import Carousel from '../Carousel'
import Column from '../Column';
import Card from '../Card';
import './index.css'

function HomePage(props) {
  console.log('--------HOMEPAGE render---------')
  useEffect(()=>{
    props.getBanner();
    props.getDailyRecommendList();
  },[])

  const {banners, dailyRecommendList} = props;
  console.log("#", dailyRecommendList);
  return (
    <div className='home-page'>
      <Carousel banners={banners}/>
      <Column title="推荐">
        {dailyRecommendList.map((l, idx) => 
        <Card key={l.id} id={l.id} name={l.name} picUrl={l.picUrl} ></Card>)}
      </Column>
    </div>
  )
}

export default connect(
  state=>({
    banners:state.home.banners,
    dailyRecommendList:state.home.dailyRecommendList
  }),
  {
    getBanner:getBannerAction,
    getDailyRecommendList:getDailyRecommendListAction
  }
)(HomePage)