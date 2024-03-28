import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist } from "../../redux/playlist/action";
import { useState } from 'react';
export default function CreatePlayListDialog({ open, setOpen, onClose }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userDetail.loggedInUser);
    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('playListName');
        const description = formData.get('description');
        const image_url = formData.get('image');
        if (image_url instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(image_url);
            reader.onload = () => {
                const imageBase64 = reader.result;
                const AddplaylistData = {
                    name,
                    description,
                    image_url: imageBase64,
                    user: userData.email,
                };
                dispatch(createPlaylist(AddplaylistData));
                handleClose();
            };
        } else {
            console.error('error image');
        }
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
            <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', textDecoration: 'underline' }}>Create Playlist</DialogTitle>
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
                        <Avatar src={selectedImage || "/broken-image.jpg"} style={{ width: "100px", height: "100px", borderRadius: "0%", cursor: "pointer" }} />
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
