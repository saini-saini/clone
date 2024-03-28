import React from 'react'
import './albumData.css'
import ReactVirtualizedTable from '../table/table'
import { useSelector } from 'react-redux'
const AlbumData = () => {

const clickedSongDatas = useSelector((state) => state?.clickSong?.clickSongData)
const songs = useSelector((state) => state?.data?.allSongsData)
const matchedSong = songs?.find(song => song.id === clickedSongDatas);

return (
    <div className='album-data-container'>
        <div className='album-data-section-one'>
          <div className='album-img'>
            <img src={matchedSong?.image_url} alt="error" className='album-img' />
          </div>
          <div >
            <h4 className='heading'>Playlist</h4>
            <h1 className='heading albumName'>{matchedSong?.name?.length > 23 ? matchedSong?.name?.slice(0, 23)+ '...' : matchedSong?.name?.charAt(0).toUpperCase() + matchedSong?.name?.slice(1)}</h1>
            <h5 className='heading artistName'>{ matchedSong?.description}</h5>
          </div>
        </div>

      <div className='album-data-section-two'>
        <ReactVirtualizedTable />
      </div>
    </div>
  )
}

export default AlbumData
