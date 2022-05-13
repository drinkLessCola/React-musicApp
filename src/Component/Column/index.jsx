import React from 'react'
import './index.css'
export default function Column(props) {
  console.log('--------COLUMN render---------')
  console.log('Column', props)
  return (
    <div className='column'>
      <h2>{props.title}</h2>
      <div className='column-content'>
        {props.children}
      </div>
    </div>
  )
}
