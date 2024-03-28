import React, { useState } from 'react'
import './playListTableData.css'
import ReactVirtualizedTable from './table'
import { useSelector } from 'react-redux'
import UpdatePlayListDialog from './updatePlaylistDetail'

const PlaylistTableData = () => {
  let playlistDetail = useSelector((state) => state?.clickSong?.clickSongData)
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdatePlaylistClick = () => {
    setOpenDialog(true);
    
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className='Playlist-album-data-container'>
      <div className='Playlist-album-data-section-one'>
        <div className='Playlist-album-img' onClick={handleUpdatePlaylistClick}>
          <img src={playlistDetail?.image_url} alt="error" className='Playlist-album-img' />
        </div>
        <div>
          <h4 className='Playlist-heading'>Playlist</h4>
          <h1 className='heading PlaylistName' onClick={handleUpdatePlaylistClick}>{playlistDetail?.name}</h1>
          <h5 className='heading Playlist-artistName' onClick={handleUpdatePlaylistClick}>{playlistDetail?.description}</h5>
        </div>
      </div>
      <div className='album-data-section-two'>
        <ReactVirtualizedTable />
      </div>
      <UpdatePlayListDialog open={openDialog} setOpen={setOpenDialog} onClose={handleCloseDialog} />
    </div>
  )
}

export default PlaylistTableData
