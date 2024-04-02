import React from 'react'
import "./layout.css"
import SideBar from '../sideBar/sideBar'
import Header from '../header/header'
import SongPlayPause from '../songPlayPause/songPlayPause'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
const Layout = () => {

  const [sideBarWidth, setSideBarWidth] = useState('normal');
  const [expand, setExpand] = useState('normal');

  const toggleSideBarWidth = () => {
    setSideBarWidth(prevWidth => prevWidth === 'normal' ? 'collapsed' : 'normal');
    if (expand === 'expanded') {
      setExpand('normal');
    }
  };

  const expandSideBarWidth = () => {
    setExpand(prevExpand => prevExpand === 'normal' ? 'expanded' : 'normal');
  };

  return (
    <div className='layout-wrapper'>
      <div className='layout-container'>
        <div className={`layout-sideBar ${sideBarWidth} ${expand}`}>
          <SideBar buttonClick={toggleSideBarWidth} expandSideBar={expandSideBarWidth}/>
        </div>

        <div className='layout-main'>
          <div className='layout-header'>
            <Header />
          </div>
          <div className='layout-other-content' >
            <Outlet />
          </div>
        </div>

      </div>
      <footer className='layout-footer'>
        <SongPlayPause />
      </footer>

    </div>

  )
}

export default Layout
