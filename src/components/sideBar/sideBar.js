import React from 'react'
import home from "../../images/home.png"
import search from "../../images/search.png"
import sideBarCollapse from "../../images/menu.png"
import plusIcon from "../../images/plus.png"
import rightArrow from "../../images/right-arrow.png"
import './sideBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import CreatePlaylist from '../createPlaylist/createPlaylist'
import { useState } from 'react'
import { ClickedSongsData } from '../../redux/clickSongData/action'
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePlaylist } from '../../redux/playlist/action'
import AlertDialogSlide from './delete'
const SideBar = ({ buttonClick,expandSideBar }) => {
  const playlists = useSelector((state) => state?.playlistData.playlists);
  const userData = useSelector((state) => state.userDetail.loggedInUser);
  const [openDialog, setOpenDialog] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);

  const [showAddPlaylistBox, setShowAddPlaylistBox] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImageClick = (song) => {
    navigate("/layout/playlistData")
    dispatch(ClickedSongsData(song));

  }

  const OnClickdeletePlaylist = (playlist) => {
    dispatch(deletePlaylist(playlist))
  }

  
  const handleClickDeletePlaylist = (playlist) => {
    setPlaylistToDelete(playlist);
    setOpenDialog(true);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPlaylistToDelete(null);
  };

  const handleDeletePlaylist = () => {
    if (playlistToDelete) {
      dispatch(deletePlaylist(playlistToDelete));
      setOpenDialog(false);
      setPlaylistToDelete(null);
    }
  };

  const filteredPlaylists = playlists ? Object.values(playlists).filter(playlist => playlist.user === userData.email) : [];

  return (
    <div className='sideBar-container'>

      <div className='sideBar-section-one'>

        <div className='sideBar-logo-wrapper'>
          <NavLink to={'/layout'} activeClassName="active" ><img src={home} alt="home" className='sideBar-logo' /></NavLink>
          <NavLink to={'/layout'} className='sideBar-text' activeClassName="active" >Home</NavLink>
        </div>

        <div className='sideBar-logo-wrapper'>
          <NavLink to={'/layout/search'} activeClassName="active"><img src={search} alt="search" className='sideBar-logo' /></NavLink>
          <NavLink to={'/layout/search'} className='sideBar-text' activeClassName="active">Search</NavLink>
        </div>
      </div>

      <div className='sidebar-library-container'>

        <div className='sidebar-library-wrapper-section-one'>
          <div className='sideBar-collapse-wrapper'>
            <img src={sideBarCollapse} alt="menu" className='sideBar-logo' onClick={buttonClick} />
            <span className='sideBar-text' onClick={buttonClick} >Your Library</span>
          </div>

          <div className='sideBar-library-logo-wrapper'>
            <img src={plusIcon} alt="plusIcon" className='sideBar-logo plausSideBarLogo' onClick={() => setShowAddPlaylistBox(!showAddPlaylistBox)} />
            {showAddPlaylistBox && <CreatePlaylist onClose={() => setShowAddPlaylistBox(false)} />}
            <img src={rightArrow} alt="rightArrow" className='sideBar-logo expandSiseBar' onClick={expandSideBar}/>
          </div>
        </div>

        <div className='sideBar-section-two'>

          <div className='sideBar-section-two-buttons'>
            <button className='playlist-artists-btn'>Playlists</button>
            <button className='playlist-artists-btn'>Artists</button>
          </div>
        </div>

        <div className='sideBar-playlists-wrapper'>
          {
            filteredPlaylists.length === 0 ?
              <div className='createFirstPlaylistBox'>
                <h4 style={{ color: 'white', margin: '40px 60px' }}>Create your first playlist</h4>
                <button className='createPlaylistBtn' onClick={() => setShowAddPlaylistBox(!showAddPlaylistBox)}>Create Playlist</button>
              </div> :
              (
                filteredPlaylists.map(playlist => (
                  <div className='sideBar-section-two-playlists' key={playlist.id}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div className='playlist-song-image'>
                        <img src={playlist.image_url} alt="" className='playlist-song-image' onClick={() => onImageClick(playlist)} />
                      </div>
                      <div className='section-two-playlists-name' onClick={() => onImageClick(playlist)}>
                        <h5 className='playlist-name'>{playlist.name}</h5>
                        <h5 className='playlist-owner-name'>PlayList. {playlist.description?.length > 20 ? playlist.description.slice(0, 20) + '...' : playlist.description}</h5>
                      </div>
                    </div>
                    <DeleteIcon className='delete-icon' onClick={() => handleClickDeletePlaylist(playlist.id)} />
                    <AlertDialogSlide
                      open={openDialog}
                      handleClose={handleCloseDialog}
                      handleDelete={handleDeletePlaylist}
                    />
                  </div>
                )))
          }
        </div>
      </div>

    </div>
  )
}

export default SideBar
