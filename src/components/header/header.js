import React from 'react'
import backward from '../../images/backward-arrow.png'
import forward from '../../images/forward.png'
import './header.css'
import downloadIcon from '../../images/download.png'
import Avatar from '@mui/material/Avatar';
import AccountDetail from '../accountDetail/accountDetail'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const [showAccount, setShowAccount] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const signUpUserData = useSelector(state => state?.userDetail?.loggedInUser);

  const backPage = () => {
    navigate(-1);
  }

  const forwardPage = () => {
    navigate(1);
  }

  const handleCloseAccount = () => {
    setShowAccount(false);
  };

  return (
    <div className='mainScreen-container'>
      <div className='left-side'>

        <div className='forward-backward-icons-wrapper'>
          <Tooltip title="Go back">
            <img src={backward} alt="backward" className='forward-backward-icon' onClick={() => backPage()} />
          </Tooltip>
          <Tooltip title="Go forward">
            <img src={forward} alt="forward" className='forward-backward-icon' onClick={() => forwardPage()} />
          </Tooltip>
        </div>
      </div>

      <div className='right-side'>
        <div className='premium-button-wrapper'>
          <button className='premium-button'>Explore Premium</button>
        </div>
        <button className='install-app-button'><img src={downloadIcon} alt="download" className='download-logo' onClick={() => navigate('/layout/https://www.spotify.com/de-en/download/windows/')} />Install App</button>
        <Avatar sx={{ bgcolor: "#1DB954", cursor: "pointer", marginRight: "20px" }} onClick={() => setShowAccount(!showAccount)}> {signUpUserData && signUpUserData.username ? signUpUserData.username.charAt(0).toUpperCase() : ''}
        </Avatar>
        {showAccount && <AccountDetail onClose={handleCloseAccount}/>}
      </div>
    </div>
  )
}

export default Header
