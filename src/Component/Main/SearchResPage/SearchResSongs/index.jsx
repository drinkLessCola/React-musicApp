import React, { Component } from 'react'
import './index.css';
import { connect } from 'react-redux';
import { addNewSongAction } from '../../../../Redux/songActions';
class SearchResSongs extends Component {

  // componentDidMount(){
    // PubSub.subscribe('search',(_,result)=>{
    //   console.log('sub',result);
    //   this.setState({
    //     songs:result.songs,
    //   })
    // })
  // }

  timeFormat(time) {
    time /= 1000;
    let min = Math.floor(time / 60),
      sec = time % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }
  addSongToList = (e) => {
    const target = e.target.closest('tr');
    const id = target.id;
    this.props.addNewSongAction(id);
  }
  render() {
    console.log('--------MAIN -> SEARCHRESSONGS render---------')
    let songs = this.props.songs || [];
    console.log('ResSongs',songs);
    return (
      <div className='SearchResSongs'>
        <table>
          <thead>
            <tr>
              <td className='list-idx'></td>
              <td className='list-func'></td>
              <td className='list-name'>音乐标题</td>
              <td className='list-artists'>歌手</td>
              <td className='list-album'>专辑</td>
              <td className='list-time'>时长</td>
            </tr>
          </thead>
          <tbody onDoubleClick={this.addSongToList}>
            {songs.length ? songs.map((s, idx) => {
              
              return (
                <tr key={s.id} id={s.id}>
                  <td className='list-idx'>{(idx+1 < 10)? '0' + (idx+1) : idx+1}</td>
                  <td className='list-func'></td>
                  <td className='list-name'>{s.name}</td>
                  <td className='list-artists'>{s.artists[0].name}</td>
                  <td className='list-album'>{s.album.name}</td>
                  <td className='list-time'>{this.timeFormat(s.duration)}</td>
                </tr>
              )
            }) : <tr><td>加载中</td></tr>}
          </tbody>
        </table>
      </div>
    )
  }
}

// mapStateToProps
// mapDispatchToProps
export default connect(
  state => ({songs:state.songs}),
  {
    addNewSongAction,
  }
)(SearchResSongs)