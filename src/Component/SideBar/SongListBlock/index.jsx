import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import LikedIcon from '../../../Icons/LikedIcon';
import UnlikedIcon from '../../../Icons/UnlikedIcon';
import ListIcon from '../../../Icons/ListIcon';
export default class SongListBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changePage = (page) => {

  }
  render() {
    const lists = this.props.list;
    console.log(lists)
    return (
      <div className="SideBar-unit">
        <div className="title">创建的歌单</div>
        <ul>
          {lists.map((l, idx) => {
            return (
              <li className="list-item"  key={idx}>
                <div className='icon'>{(idx == 0)? <UnlikedIcon /> : <ListIcon />}</div>
                <NavLink to={`/songlist/${l.id}`}>{l.listName}</NavLink>
              </li>
            )
          }
          )}
        </ul>

      </div>

    );
  }
}
