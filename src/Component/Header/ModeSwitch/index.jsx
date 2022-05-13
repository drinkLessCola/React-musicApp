import React from 'react'
import './index.css'
import ThemeContext from '../../../Context/ThemeContext';

export default function ModeSwitch() {
  console.log('--------HEADER -> MODESWITCH render---------')
  const switchInput = React.createRef(null); 
  function handleSwitch(callback){
    console.log('执行switch!!')
    callback();
  }
  return (
    <ThemeContext.Consumer>
      { ({toggleTheme}) => (
        <label htmlFor='switch'>
          <input type="checkbox" id="switch" ref={switchInput}></input>
          <div className="ModeSwitch"  onClick={handleSwitch.bind(null, toggleTheme)}></div>
      </label>
      )}
    </ThemeContext.Consumer>
  )
}

// 草，context 传递的函数执行了两次，居然是 label 的问题，这河狸吗？？？？？
// label 内部的点击冒泡到了 label 上触发了事件
// label 关联的 input 也会触发点击，再次冒泡