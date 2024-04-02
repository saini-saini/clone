import React from 'react'
import './main.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClickedSongsData } from '../../redux/clickSongData/action';
import play from "../../images/play.png";

const Main = () => {
    const songs = useSelector((state) => state?.data?.allSongsData)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onImageClick = (song) => {
        navigate("/layout/album/songs")
        dispatch(ClickedSongsData(song));
    }

    return (
        <div className='song-card-container' >
            {songs?.map((song) => (
                <div className='song-card-wrapper' key={song?.uri}>
                    <div className='song-img'>
                        <img src={song?.image_url} alt="error" className='song-img' onClick={() => onImageClick(song.id)} />
                        <div className='playSong' onClick={() => onImageClick(song.id)} >
                            <img src={play} alt="play" className='playSongImg' onClick={() => onImageClick(song.id)} />
                        </div>
                    </div>

                    <div >
                        <h5 className='playlist-name'>{song?.name?.length > 23 ? song?.name.slice(0, 23) + '...' : song?.name}</h5>
                        <h5 className='playlist-description'>{song?.description?.length > 60 ? song?.description.slice(0, 60) + '...' : song?.description}</h5>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Main




