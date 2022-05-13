import React from 'react'
import './index.css'
import ThemeContext from '../../../Context/ThemeContext';

export default function ModeSwitch() {
  console.log('--------HEADER -> MODESWITCH render---------')
  const switchInput = React.createRef(null); 
  return (
    <ThemeContext.Consumer>
      { (obj) => (
        <label htmlFor='switch' onClick={obj.changeTheme}>
          <input type="checkbox" id="switch" ref={switchInput}></input>
          <div className="ModeSwitch"></div>
      </label>
      )}
    </ThemeContext.Consumer>
  )
}
