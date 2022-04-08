import SongListPage from "../Component/Main/SongListPage";
import {Navigate} from "react-router-dom";
import SearchResPage from "../Component/Main/SearchResPage";
import VideoPage from "../Component/Main/VideoPage";
import SearchResSongs from "../Component/Main/SearchResPage/SearchResSongs";
import SearchResVideos from "../Component/Main/SearchResPage/SearchResVideos";
import SearchResArtists from "../Component/Main/SearchResPage/SearchResArtists";
import Songs from "../Component/Main/SongListPage/Songs";

export default[
  {
    path:'/',
    element:<Navigate to="/songlist/1"/>
  },

  {
    path:'/songlist/:listid',
    element:<SongListPage/>,
  },
  {
    path:'/s',
    element:<SearchResPage />,
    children:[
      {
        path:'songs',
        element:<SearchResSongs/>
      },
      {
        path:'artists',
        element:<SearchResArtists/>
      },
      {
        path:'albums',
        element:<SearchResVideos/>
      },
      {
        path:'videos',
        element:<SearchResVideos/>
      },
      {
        path:'songlists',
        element:<SearchResSongs/>,
      },
      {
        path:'lyrics',
        element:<SearchResSongs/>
      },
      {
        path:'users',
        element:<SearchResSongs/>
      }
    ]
  },
  {
    path:'/mv',
    element:<VideoPage/>
  },

]
