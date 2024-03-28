import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
const SearchField = () => {

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


  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    console.log('Input Value:', value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [searchValue]);

  return (
    <div className='search-field-container'>
      <Search>
        <SearchIconWrapper>
          <SearchIcon style={{ color: 'white' }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="What do you want to play?"
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={handleInputChange}
          inputRef={inputRef}
        />
      </Search>
    </div>
  )
}

export default SearchField
