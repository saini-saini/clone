import React, { useState } from 'react'
import './searchScreen.css'
import Footer from '../footer/footer'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickedSongsData } from '../../redux/clickSongData/action';

const SearchScreen = () => {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: 30,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        '&:focus-within': {
            borderColor: 'white',
            borderWidth: '2px',
            borderStyle: 'solid',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            fontSize: '14px',
            [theme.breakpoints.up('md')]: {
                width: '320px',
                height: '35px',
                color: 'white',
            },
        },
    }));

    const artists = useSelector((state) => state.data.allSongsData)
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        console.log('Input Value:', value);
    };

    useEffect(() => {
        inputRef.current.focus();
    }, [searchValue]);

    const filteredArtists = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchValue.toLowerCase())
    );


    // const filteredArtists = [...artists, ...AlbumSongs].filter((item) => {
    //     if (item.name && item.name.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true;
    //     }
    //     if (item.title && item.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true;
    //     }
    //     return false;
    // });


    const onImageClick = (song) => {
        navigate("/layout/album/songs")
        dispatch(ClickedSongsData(song));
    }

    return (
        <>
            <div className='search-field-container'>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon style={{ color: 'white' }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="search by artist name"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchValue}
                        onChange={handleInputChange}
                        inputRef={inputRef}
                    />
                </Search>
            </div>

            <div className='search-screen-container'>
                {filteredArtists?.length > 0 ? (
                    <div className='song-card-container'>
                        {filteredArtists.map((song) => (
                            <div className='song-card-wrapper'>
                                <div className='song-img'>
                                    <img src={song.image_url} alt="error" className='playlist-song-img' onClick={() => onImageClick(song.id)} />
                                </div>
                                <div className='playlist-name-container'>
                                    <h4 className='search-playlist-name'>{song.name}</h4>
                                </div>
                            </div>

                        ))}
                    </div>
                ) : (<h1 style={{ color: 'white', textAlign: 'center' }}>No match found</h1>)}
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default SearchScreen
