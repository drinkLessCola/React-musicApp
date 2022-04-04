import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import './index.css';
import SearchResSongs from './SearchResSongs';
import SearchResVideos from './SearchResVideos'
import SearchResArtists from './SearchResArtists';
import { createSearchAction } from '../../../Redux/actions';
import { connect } from 'react-redux';

class SearchResPage extends Component {
  state = {
    searchData:'Rick and Morty',
    tab:'songs'
  }
  getData(value, type){
    console.log('dispatch');
    this.props.search(type, value);
  }
  handleClick = (e) =>{
    // 比较点击的 tab 与 当前 tab 节流
    const searchData = this.props.location.search.split('=')[1];
    const type = e.target.closest('li').id;

    if(this.state.tab == type) return;
    // 应该把 state 作为一个不可变的变量
    // 方便进行时间回溯
    this.getData(searchData, type);
    this.setState({
      tab:type
    })
  }
  render() {
    console.log('page',this.props)
    const searchData = this.props.location.search.split('=')[1];
    // const type = this.props.location.pathname.slice(3);
    return (
      <div className='SearchResPage'>
        <h1>搜索 {decodeURIComponent(searchData)}</h1>
        <ul className='Search-Navbar' onClick={this.handleClick}>
          <li id='songs'><NavLink to={`/s/songs?search=${searchData}`}>单曲</NavLink></li>
          <li id='artists'><NavLink to={`/s/artists?search=${searchData}`}>歌手</NavLink></li>
          <li id='albums'><NavLink to={`/s/albums?search=${searchData}`}>专辑</NavLink></li>
          <li id='videos'><NavLink to={`/s/videos?search=${searchData}`}>视频</NavLink></li>
          <li id='songlists'><NavLink to={`/s/songlists?search=${searchData}`}>歌单</NavLink></li>
          <li id='lyrics'><NavLink to={`/s/lyrics?search=${searchData}`}>歌词</NavLink></li>
          <li id='users'><NavLink to={`/s/users?search=${searchData}`}>用户</NavLink></li>
        </ul>
        <Switch>
          <Route path='/s/songs' component={SearchResSongs}></Route>
          <Route path='/s/artists' component={SearchResArtists}></Route>
          <Route path='/s/albums' component={SearchResVideos}></Route>
          <Route path='/s/videos' component={SearchResVideos}></Route>
          <Route path='/s/songlists' component={SearchResSongs}></Route>
          <Route path='/s/lyrics' component={SearchResSongs}></Route>
          <Route path='/s/users' component={SearchResSongs}></Route>

        </Switch>
        {/* <SearchResSongs /> */}
      </div>
    )
  }
}



export default connect(
  state => ({}),
  {
    search:createSearchAction,
  }
)(SearchResPage)