import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './playListTableData.css'
import heartGray from '../../images/heartGray.png';
import more from '../../images/more.png';
import list from '../../images/list.png';
import Tooltip from '@mui/material/Tooltip';
import CreatePlayListDialog from './addModal';
import { useDispatch, useSelector } from 'react-redux';
import { ClickedTableSong } from '../../redux/clickSongData/action';
import PauseIcon from '@mui/icons-material/Pause';
import play from '../../images/play.png';


export default function ReactVirtualizedTable() {
    const [openDialog, setOpenDialog] = useState(false);
    const data = useSelector((state) => state.clickSong.clickSongData.id)
    const platlistData = useSelector((state) => state.playlistData.playlists)
    const filteredPlaylist = platlistData.filter(item => item.id === data);
    let playlistDetail = filteredPlaylist[0]?.songs;
    const allAlbumSongs = useSelector((state) => state.data.allAlbumSongs)
    const matchedSongs = allAlbumSongs.filter(song => playlistDetail?.includes(song.id));
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const onImageClick = (matchedSong) => {
        dispatch(ClickedTableSong(matchedSong.id))
    }


    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };


    function createData(index, title, album, duration) {
        return { index, title, album, duration };
    }


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

    let rows;
    if (matchedSongs && matchedSongs.length > 0) {
        rows = matchedSongs.map((matchedSong, index) =>
            createData(
                index + 1,
                <div className='songImg-title'>
                    <img src={matchedSong?.img_url} alt="" className='match-song-img' onClick={() => onImageClick(matchedSong)} />
                    <div className='match-song-title'>
                        {matchedSong.title}
                    </div>
                </div>,
                matchedSong.album,
                matchedSong.duration || "N/A"
            )
        );
    } else {
        rows = [
            createData(
                "",
                <div style={{ color: 'white', textAlign: 'center', width: "450px", paddingLeft: "200px" }}>
                    <h1>Add some songs to your playlist to see them here</h1>
                </div>,
                '',
                ''
            )
        ];
    }

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
                            borderBottom: "none"

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
                <div className='Playlist-tableHeader-icons'>

                    <div className='Playlist-tableHeader-icons-left'>
                        {isPlaying ? (
                            <PauseIcon className='playImg' onClick={togglePlayPause} />
                        ) : (
                            <img src={play} alt="play" className='playImg' onClick={togglePlayPause} />
                        )}
                        <Tooltip title="Save to your library">
                            <img src={heartGray} alt="heartGrayImg" className='heartGray' />
                        </Tooltip>
                        <Tooltip title="More option">
                            <img src={more} alt="moreImg" className='moreImg' />
                        </Tooltip>
                    </div>


                    <div className='Playlist-tableHeader-icons-right'>
                        <button variant="contained" className='addBtn' onClick={handleOpenDialog}>Add</button>
                        <span className='Playlist-tableHeader-icons-right-span'>List</span> <img src={list} alt="listImg" className="listImg" />
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
            <CreatePlayListDialog open={openDialog} setOpen={setOpenDialog} onClose={handleCloseDialog} />

        </>
    );
}
