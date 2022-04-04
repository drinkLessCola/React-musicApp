import React, { Component } from 'react'
import SearchIcon from '../../../Icons/SearchIcon'
import { createSearchAction } from '../../../Redux/actions';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
class Search extends Component {

  getData(value, type){
    this.props.search(type, value);
  }

  handleKeyDown = (event) =>{
    if(event.key != 'Enter') return;
    console.log('Enter');
    const value = event.target.value;
    // debug了很久的一个问题，如何在一般组件中实现跳转，
    // 使用 withRouter
    // 传递 search 参数？前面不要打斜线
    // this.getSongs(value)
    this.getData(value,'songs');
    this.props.history.push(`/s/songs?search=${value}`);
  }
  render() {
    return (
      <div className='Search'>
        <SearchIcon />
        <input onKeyDown={this.handleKeyDown}></input>
      </div>
    )
  }
}

// withRouter 和 connect 一起使用！！
export default withRouter(connect(
  state => ({}),
  {
    search:createSearchAction,
  }
)(Search));
