import React from 'react'
import "./layout.css"
import SideBar from '../sideBar/sideBar'
import Header from '../header/header'
import SongPlayPause from '../songPlayPause/songPlayPause'
import { Outlet} from 'react-router-dom'
import { useState } from 'react'
const Layout = () => {

  const [sideBarWidth, setSideBarWidth] = useState('normal');

  const newWidth = sideBarWidth === 'normal' ? 'collapsed' : 'normal';
  const toggleSideBarWidth = () => {
    setSideBarWidth(newWidth);
  };

  return (
    <div className='layout-wrapper'>
<div className='layout-container'>
      
      <div className={`layout-sideBar ${sideBarWidth}`}>
        <SideBar buttonClick={toggleSideBarWidth} />
      </div>

      <div className='layout-main'>
        <div className='layout-header'>
            <Header/>
        </div>
        <div className='layout-other-content' >
        <Outlet/>
        </div>
      </div>
      
    </div>
    <footer className='layout-footer'>
        <SongPlayPause/>
      </footer>
      
    </div>
    
  )
}

export default Layout
