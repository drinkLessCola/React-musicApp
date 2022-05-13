import React, { useEffect } from 'react'
import './index.css';
const imgNums = 9;
export default function Carousel(props) {
  console.log('--------CAROUSEL render---------')
  const [curIdx, setCurIdx ] = React.useState(0)

  useEffect(()=>{
    let timer = setInterval(()=> {
      setCurIdx((idx) => (idx + 1 > imgNums - 1)? 0 : idx + 1)
    },3000)
    return ()=>{
      clearTimeout(timer);
    }
  },[])
  console.log(curIdx)

  const {banners = ['a','b','c','d']} = props;
  return (
    <div>
      <div className='carousel'>
        {banners.map((img, idx) => <div key={idx} level={(curIdx - idx === 1 || curIdx - idx === - imgNums + 1)? 'sub-left' : ((idx - curIdx === 1 || idx - curIdx === -imgNums + 1)? 'sub-right' : ((curIdx === idx)? 'top' : 'hide'))}>
          <img src={img.imageUrl}></img>
        </div>)}
      </div>
      <ul className='carousel-label'>
        {banners.map((img, idx) => <li key={idx} className={(idx == curIdx)? 'active' : ''} ></li>)}
      </ul>
    </div>
  )
}
