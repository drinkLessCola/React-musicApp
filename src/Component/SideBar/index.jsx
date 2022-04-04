import React, { Component } from 'react'
import SongListBlock from './SongListBlock';
import './index.css';
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="SideBar">
        <SongListBlock list={this.props.list} />
      </div>
    );
  }
}
