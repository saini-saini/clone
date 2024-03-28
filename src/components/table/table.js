import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from 'react-redux';
import "./table.css";
import play from '../../images/play.png';
import heartGray from '../../images/heartGray.png';
import more from '../../images/more.png';
import list from '../../images/list.png';
import Tooltip from '@mui/material/Tooltip';
import SongsList from '../../data/SongsList';
import { createPlaylist } from '../../redux/userData/action';
import { ClickedTableSong, tableData } from '../../redux/clickSongData/action';
import PauseIcon from '@mui/icons-material/Pause';


export default function ReactVirtualizedTable() {
    const tracks = useSelector((state) => state?.clickSong?.clickSongData);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);

    const dispatch = useDispatch();
    function createData(index, title, album, duration) {
        return { index, title, album, duration };
    }

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    useEffect(() => {
        if (tracks) {
            const filteredSongsList = SongsList.filter(song => song.singerId === tracks);
            dispatch(tableData(filteredSongsList));
        }
    }, [tracks]);


    const addPlayList = (tracks) => {
        if (tracks) {
            // const filteredSongsList = SongsList.filter(song => song.singerId === tracks.id);
            const playlistData = {
                name: tracks.name,
                description: tracks.description,
                image_url: tracks.image_url,
                // rowData: filteredSongsList.map(song => ({
                //     title: song.title,
                //     album: song.album,
                //     singerId: song.singerId,
                //     image_url: song.img_url
                // }))
            };
            dispatch(createPlaylist(tracks));
        }
    };

    const onImageClick = (matchedSong) => {
        dispatch(ClickedTableSong(matchedSong.id))
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const columns = [
        {
            width: 0,
            label: '#',
            dataKey: 'index',
        },
        {
            width: 200,
            label: 'Title',
            dataKey: 'title',
        },
        {
            width: 120,
            label: 'Album',
            dataKey: 'album',
            numeric: true,
        },
        {
            width: 120,
            label: <Tooltip title="Duration"> <AccessTimeIcon /></Tooltip>,
            dataKey: 'duration',
            numeric: true,
        },
    ];
    const rows = tracks ?
        SongsList
            .filter(song => song.singerId === tracks)
            .map((matchedSong, index) =>
                createData(
                    index + 1,
                    <div className='songImg-title'>
                        < img src={matchedSong?.img_url} alt="" className='match-song-img' onClick={() => onImageClick(matchedSong)} />
                        <div className='match-song-title' onClick={() => onImageClick(matchedSong)}>
                            {matchedSong.title}
                        </div>
                    </div>,
                    matchedSong.album,
                    matchedSong.duration || "N/A"
                )
            )
        : [];

    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} sx={{
                backgroundColor: "#1E1E1E", '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead,
        TableRow: ({ item: _item, index, ...props }) => (
            <TableRow
                {...props}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={() => handleRowHover(null)}
                sx={{
                    backgroundColor: hoveredRow === index ? 'green' : 'yellow',

                }}
            />
        ),
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };

    function fixedHeaderContent() {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align={column.numeric || false ? 'right' : 'left'}
                        style={{ width: column.width }}
                        sx={{
                            backgroundColor: '#1E1E1E',
                            color: '#8B8485',
                            borderBottom: "1px solid gray",
                            cursor: "default"
                        }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    }

    function rowContent(_index, row) {
        return (
            <React.Fragment>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? 'right' : 'left'}
                        sx={{
                            backgroundColor: '#1E1E1E',
                            color: 'white',
                            borderBottom: "none",
                        }}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }


    return (
        <>
            <Paper style={{ height: 400, width: '100%' }}>
                <div className='tableHeader-icons'>

                    <div className='tableHeader-icons-left'>
                        {isPlaying ? (
                            <PauseIcon className='playImg' onClick={togglePlayPause} />
                        ) : (
                            <img src={play} alt="play" className='playImg' onClick={togglePlayPause} />
                        )}
                        <Tooltip title="Save to your library">
                            <img src={heartGray} alt="heartGrayImg" className='heartGray' onClick={() => addPlayList(tracks)} />
                        </Tooltip>
                        <Tooltip title="More option">
                            <img src={more} alt="moreImg" className='moreImg' />
                        </Tooltip>
                    </div>

                    <div className='tableHeader-icons-right'>
                        <span className='tableHeader-icons-right-span'>List</span> <img src={list} alt="listImg" className="listImg" />
                    </div>

                </div>
                <TableVirtuoso
                    style={{ borderRadius: '0px' }}
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </>
    );
}
