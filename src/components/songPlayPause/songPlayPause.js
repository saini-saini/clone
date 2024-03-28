import React, { useEffect, useState } from 'react';
import './songPlayPause.css';
// import heartIcon from '../../images/heart.png';
// import play1 from '../../images/playloop.png';
import backward from '../../images/back.png';
import play from '../../images/play.png';
import forward from '../../images/next.png';
// import loop from '../../images/loop.png';
import playButton from '../../images/play-button.png';
import queue from '../../images/queue.png';
import desktopComputer from '../../images/desktop-computer.png';
import volume from '../../images/volume-up.png';
import collapse from '../../images/collapse.png';
import ContinuousSlider from './song-slider';
import PauseIcon from '@mui/icons-material/Pause';
import { useSelector } from 'react-redux';

const SongPlayPause = () => {
    const song = useSelector((state) => state?.clickSong?.clickedTableSong);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const tableData = useSelector((state) => state?.clickSong?.tableData);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();

    useEffect(() => {
        if (tableData && Array.isArray(tableData)) {
            const newIndex = tableData.findIndex(data => data.id === song);
            if (newIndex !== -1) {
                setCurrentSongIndex(newIndex);
                // setIsPlaying(true);
            }
        }
    }, [song, tableData]);


    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentSongIndex]);

    const forwardSong = () => {
        const nextIndex = currentSongIndex + 1;
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

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
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
                {/* <img src={heartIcon} alt="like" className='songPlayPause-like' /> */}
            </div>

            <div className='songPlayPause-center-side-wrapper'>
                <div className='songPlayPause-center-side'>
                    {/* <img src={play1} alt="play-loop" className='songPlayPause' /> */}
                    <img src={backward} alt="backward" className='songPlayPause' onClick={backwardSong} />
                    {isPlaying ? (
                        <PauseIcon className='pausebtn' onClick={togglePlayPause} />
                    ) : (
                        <img src={play} alt="play" className='playbtn' onClick={togglePlayPause} />
                    )}
                    <img src={forward} alt="forward" className='songPlayPause' onClick={forwardSong} />
                    {/* <img src={loop} alt="loop" className='songPlayPause' /> */}
                </div>
                <div className='song-slider'>
                    <ContinuousSlider width={"600px"} startTime={"0:00"} endTime={"4:00"} />
                </div>
            </div>

            <div className='songPlayPause-right-side'>
                <img src={playButton} alt="play-button" className='songPlayPause' />
                <img src={queue} alt="queue" className='songPlayPause' />
                <img src={desktopComputer} alt="desktop-computer" className='songPlayPause' />
                <div className='volume-slider'>
                    <img src={volume} alt="volume" className='songPlayPause' />
                    <ContinuousSlider width={"150px"} />
                </div>
                <img src={collapse} alt="collapse" className='songPlayPause' />
            </div>

            <audio ref={audioRef} src={tableData[currentSongIndex]?.song ? Object.values(tableData[currentSongIndex].song)[0] : ''} />
        </div>
    );
}

export default SongPlayPause;
