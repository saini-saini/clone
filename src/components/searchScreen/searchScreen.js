import React from 'react'
import './searchScreen.css'
import Footer from '../footer/footer'
import { useSelector } from 'react-redux'
const SearchScreen = () => {
    const artists = useSelector((state) => state.data.allSongsData)

    return (
        <div className='search-screen-container'>

            <div className='song-card-container'>
                {artists.map((song) => (
                    <div className='song-card-wrapper'>
                        <div className='song-img'>
                            <img src={song.data?.visuals.avatarImage.sources[0].url} alt="error" className='playlist-song-img' />
                        </div>
                        <div className='playlist-name-container'>
                            <h4 className='search-playlist-name'>{song.data?.profile.name}</h4>
                        </div>
                    </div>

                ))}
            </div>

            <div>
                <Footer />
            </div>


        </div>
    )
}

export default SearchScreen
