import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialogSlide = ({ open, handleClose, handleDelete }) => {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{fontWeight: 'bold'}}>{"Delete Playlist?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{color: 'black'}}>
            Are you sure you want to delete this playlist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'black'}}>Cancel</Button>
          <Button onClick={handleDelete} variant='contained' 
          sx={{
            backgroundColor: '#1FDF64',
            color: 'black',
            '&:hover': {
              backgroundColor: '#1FDF64',
            },
          }}
          >Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialogSlide;
