import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ClickedAddSong, ClickedRemoveSong } from "../../redux/playlist/action";
export default function CreatePlayListDialog({ open, setOpen, onClose }) {
    const ALLAlbumsongs = useSelector((state) => state?.data?.allAlbumSongs)
    const filteredPlaylist = useSelector((state) => state?.clickSong?.clickSongData)
    const playlistData = useSelector((state) => state?.playlistData);
    const [selectedSongs, setSelectedSongs] = useState({});
    const dispatch = useDispatch();


    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    const handleButtonClick = (event, songId) => {
        event.preventDefault();
        const updatedSelectedSongs = { ...selectedSongs };
        updatedSelectedSongs[songId] = !updatedSelectedSongs[songId];
        setSelectedSongs(updatedSelectedSongs);
        if (updatedSelectedSongs[songId]) {
            dispatch(ClickedAddSong(filteredPlaylist.id, songId));

        } else {
            dispatch(ClickedRemoveSong(filteredPlaylist.id, songId));
        }
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                style: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: "#1E1E1E"
                }
            }}

        >
            <DialogTitle style={{ color: "white", display: "flex", justifyContent: "center", borderBottom: "1px solid black" }}>Add Songs</DialogTitle>
            <DialogContent
                sx={{
                    padding: "0px",
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}>
                {ALLAlbumsongs && ALLAlbumsongs.map((song, index) => (
                    <tr className='AddModaltableRow' key={index}>
                        <div>
                            <td><img src={song?.img_url} alt="" className='AddModaltableImg' /></td>
                        </div>
                        <div>
                            <td >{song?.title}</td>
                        </div>
                        <div className='ModalBtnWrapper'>
                            <button className='ModalBtn' onClick={(event) => handleButtonClick(event, song.id)} style={{ backgroundColor: selectedSongs[song.id] ? 'rgb(197, 41, 41)' : '#202020' }}>
                                {selectedSongs[song.id] ? "Remove" : "Add"}
                            </button>
                        </div>
                    </tr>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='contained' style={{ color: "white", backgroundColor: "#4D4D4D" }}>Cancel</Button>
            </DialogActions>
        </Dialog >
    );
}
