import React, { Component } from 'react'
import SearchIcon from '../../../Icons/SearchIcon'
import { createSearchAction } from '../../../Redux/searchActions';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux'
function Search(props){

  const navigate = useNavigate();

  function getData(value, type){
    props.search(type, value);
  }

  function handleKeyDown(event){
    if(event.key != 'Enter') return;
    console.log('Enter');
    const value = event.target.value;
    // debug了很久的一个问题，如何在一般组件中实现跳转，
    // 使用 withRouter
    // 传递 search 参数？前面不要打斜线
    // getSongs(value)
    getData(value,'songs');
    navigate(`/s/songs?search=${value}`);
  }

    return (
      <div className='Search'>
        <SearchIcon />
        <input onKeyDown={handleKeyDown}></input>
      </div>
    )
  
}

// withRouter 和 connect 一起使用！！
// export default withRouter(connect(
//   state => ({}),
//   {
//     search:createSearchAction,
//   }
// )(Search));

export default connect(
  state => ({}),
  {
    search:createSearchAction,
  }
)(Search);
