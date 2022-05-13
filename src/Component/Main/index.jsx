import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import VideoPage from './VideoPage'
import SongListPage from './SongListPage';
import SearchResPage from './SearchResPage';
import { Route, Routes, Navigate, Outlet, BrowserRouter, useRoutes } from 'react-router-dom';
import routeTable from '../../Routes/index'
export default function Main(props){
  console.log('--------MAIN render---------')
    const [state, setState] = React.useState({
      songList: props.songList,
      songs:null,
    });
    const elems = useRoutes(routeTable);
    // 要在 return 中部署 Routes
    return <div className="Main">
      {elems}
      {/* <Routes>
            <Route path='/songlist/:listid' element={<SongListPage />} ></Route>
            <Route path='/s/*' element={<SearchResPage/>}></Route>
            <Route path='/mv' element={<VideoPage/>} ></Route>
            <Route path="/" element={<Navigate to='/songlist/1'></Navigate>}></Route>
          </Routes> */}
        <Outlet/>
      </div>;

}
