import React from 'react'
import './index.css'
function Menu(props,ref) {
  return (
    <div className='Menu' ref={ref}>
      <div className='menu-item'>{props.children}</div>
    </div>
  )
}
export default React.forwardRef(Menu)