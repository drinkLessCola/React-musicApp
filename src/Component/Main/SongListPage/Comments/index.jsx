import React, { Component } from 'react'
import './index.css';
export default class Comments extends Component {
  render() {

    const { comments } = this.props.location.state;
    console.log(comments);
    return (
      <div className='Comments'>
        <ul>
          {comments.map((c, idx) => {
            return (
              <li className='Comments-item' key={idx}>
                <div className='img'>
                  <img src={c.avaturUrl}></img>
                </div>
                <div className='content'>
                  <span className='comment'>
                    <span className='nickName'>{c.userName}</span>
                    {c.comment}
                  </span>
                  <div className='date'>{c.date.toLocaleString()}</div>
                </div>
              </li>)
          })}
        </ul>
      </div>
    )
  }
}
