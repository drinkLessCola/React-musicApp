import React from 'react'
import './index.css'
function Menu(props,ref) {
  function handleClick(e){
    console.log('click');
    props.handleMenuClick(e);
  }
  return (
    <div className='Menu' ref={ref} onClick={handleClick}>
      <div className='menu-item'>{props.children}</div>
    </div>
  )
}
export default React.forwardRef(Menu)