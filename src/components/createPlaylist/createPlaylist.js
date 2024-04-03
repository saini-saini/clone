import React from 'react'
import "./createPlaylist.css"
import { Link } from 'react-router-dom'
import addSong from '../../images/addSong.png'
import { useRef } from 'react'
import { useEffect } from 'react'
import CreatePlayListDialog from './playListDialog'
import { useState } from 'react'

const CreatePlaylist = ({ onClose }) => {
  const createPlaylistRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOutside = (event) => {
    if (
      createPlaylistRef.current &&
      !createPlaylistRef.current.contains(event.target) &&
      !event.target.closest('.MuiDialog-root')
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleCreatePlaylistClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className='createPlaylist-container' ref={createPlaylistRef}>
      <div className='createPlaylist-heading'>
        <Link className='createPlaylist-heading' onClick={handleCreatePlaylistClick}>
          <img src={addSong} alt="addSong" className='createNewPlaylist-logo' />
          Create a new playlist
        </Link>
      </div>
      <CreatePlayListDialog open={openDialog} setOpen={setOpenDialog} onClose={handleCloseDialog} />
    </div>
  )
}

export default CreatePlaylist