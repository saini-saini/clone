import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updatePlaylist } from '../../redux/playlist/action';
import { ClickedSongsData } from '../../redux/clickSongData/action';
export default function UpdatePlayListDialog({ open, setOpen, onClose }) {
    let playlistDetail = useSelector((state) => state?.clickSong?.clickSongData)
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    useEffect(() => {
        setSelectedImage(null);
    }, [playlistDetail]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file instanceof File) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
        }
    };

    useEffect(() => {
        if (playlistDetail) {
            setName(playlistDetail.name || '');
            setDescription(playlistDetail.description || '');
        }
    }, [playlistDetail]);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !description) {
            console.error('Please fill in all required fields');
            return;
        }
        const updatedPlaylistData = {
            ...playlistDetail,
            name,
            description,
            image_url: selectedImage || playlistDetail.image_url,
        };
        dispatch(updatePlaylist(updatedPlaylistData));
        dispatch(ClickedSongsData(updatedPlaylistData))
        handleClose();
    };



    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,

            }}
        >
            <DialogTitle sx={{fontWeight: 'bold', textAlign: 'center', textDecoration: 'underline'}}>Update Playlist</DialogTitle>
            <DialogContent style={{ display: "flex", gap: "30px", alignItems: "center", justifyContent: "center" }}>
                <div>
                    <input
                        accept="image/*"
                        id="image"
                        name="image"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Avatar src={selectedImage || playlistDetail?.image_url || "/broken-image.jpg"} style={{ width: "100px", height: "100px", borderRadius: "0%", cursor: "pointer" }} />
                    </label>
                    <TextField
                        required
                        margin="dense"
                        id="playListName"
                        name="playListName"
                        label="Name"
                        type="text"
                        placeholder='Add a playlist name'
                        fullWidth
                        variant="standard"
                        inputProps={{ maxLength: 16 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        placeholder='Add an optional description'
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} sx={{ color: 'black' }}>Cancel</Button>
                <Button type="submit" variant='contained' sx={{ backgroundColor: "#1FDF64", ':hover': { backgroundColor: '#1FDF64' }, color: 'black' }}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
