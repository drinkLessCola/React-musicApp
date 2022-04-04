import React, { Component } from 'react'
import PubSub from 'pubsub-js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: props.songList,
      songs:null,
    };
  }
  render() {
    return <div className="Main">{this.props.children}</div>;
  }
}
