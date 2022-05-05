import React from 'react'
import './index.css'
export default function Card(props) {
  const {picUrl, name, id} = props;
  return (
    <div className='card' id={id}>
      <div className='card-img'>
        <img src={picUrl}></img>
      </div>
      <label className='card-info' htmlFor={id}>
        <p className='card-title'>{name}</p>
        <p className='card-author'></p>
      </label>
    </div>
  )
}
