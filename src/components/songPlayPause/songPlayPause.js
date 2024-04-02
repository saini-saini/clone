import React, { useEffect, useState } from 'react';
import './songPlayPause.css';
import backward from '../../images/backward.png';
import forward from '../../images/next.png';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const SongPlayPause = () => {
    const song = useSelector((state) => state?.clickSong?.clickedTableSong);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const tableData = useSelector((state) => state?.clickSong?.tableData);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (tableData && Array.isArray(tableData)) {
            const newIndex = tableData.findIndex(data => data.id === song);
            if (newIndex !== -1) {
                setCurrentSongIndex(newIndex);
                // setIsPlaying(true);
            }
        }
    }, [song, tableData]);

    const forwardSong = () => {
        const nextIndex = currentSongIndex + 1;
        console.log(nextIndex);
        if (nextIndex < tableData.length) {
            setCurrentSongIndex(nextIndex);
            setIsPlaying(true);
        }
    };

    const backwardSong = () => {
        const prevIndex = currentSongIndex - 1;
        if (prevIndex >= 0) {
            setCurrentSongIndex(prevIndex);
            setIsPlaying(true);
        }
    };

    return (
        <div className='songPlayPause-container'>

            <div className='songPlayPause-left-side'>
                <div className='songPlayPause-song-image'>
                    <img src={tableData[currentSongIndex]?.img_url} alt="" className='songPlayPause-image' />
                </div>
                <div className='songPlayPause-playlists-name'>
                    <h4 className='songPlayPause-name'>{tableData[currentSongIndex]?.title}</h4>
                    <h5 className='songPlayPause-name'>Playlist.Spotify</h5>
                </div>
            </div>

            <div className='songPlayPause-center-side-wrapper'>
                <AudioPlayer
                    autoPlay
                    src={tableData[currentSongIndex]?.song ? Object.values(tableData[currentSongIndex].song)[0] : ''}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={forwardSong}
                    volume={0.5}
                    className="custom-audio-player"
                />
                <img src={backward} alt="backward" className='backward-controls' onClick={backwardSong} />
                <img src={forward} alt="forward" className='forward-controls' onClick={forwardSong} />
            </div>
        </div>
    );
}

export default SongPlayPause;
