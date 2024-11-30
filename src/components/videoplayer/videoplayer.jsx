import { useEffect, useRef, useState } from 'react';
import './videoplayer.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';

import axios from 'axios';

function VideoPlayer({ currentVideo, updateVideoPlayer }) {

  const videoPlayerUrl = 'https://cdnapi.codev8.net/cms-player/default.iframe?injectSrc=';

  const [videoData, setVideoData] = useState({});
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const prevCurrentVideoRef = useRef();

  useEffect(() => {
    if (prevCurrentVideoRef.current !== currentVideo) {
      setVideoData(currentVideo);
      prevCurrentVideoRef.current = currentVideo;
    }
  }, [currentVideo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const newMediaData = {
      title: formJson.title,
      description: formJson.description,
      duration: Number(formJson.duration),
      tags: formJson.tags,
      filedata: {
        bitrate: Number(formJson.filedatabitrate),
        fileSize: Number(formJson.filedatafileSize),
        filename: formJson.filename
      },
      thumbnail: {
        name: formJson.thumbnailname,
        filename: formJson.thumbnailfilename
      }
    };

    try {
      const response = await axios.post('http://localhost:3000/addmedias', newMediaData);
      if (response.status == 201) {
        setOpenSnackbar(true);
        updateVideoPlayer(true);
      }

      handleClose();
    } catch (error) {
      console.error("Error adding media:", error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div className='VideoPlayer'>
      <div className="iframe">
        <iframe
          src={Object.keys(videoData).length > 0 ? `${videoPlayerUrl}${videoData.mediaroute}` : videoPlayerUrl}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video Player"
        ></iframe>
      </div>
      <div className="videoData">
        <div className='data'>
          {
            Object.keys(videoData).length > 0 ? <>
              Título: {videoData.title}<br></br>
              Descripcion: {videoData.description}<br></br>
            </>
              : ""
          }
        </div>
        <div className='addMedia'>
          <Button variant="contained" color='error' onClick={handleClickOpen}>add media</Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit
        }}
      >
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can add a new media video
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="duration"
            name="duration"
            label="duración"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="tags"
            name="tags"
            label="tags"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="filedatabitrate"
            name="filedatabitrate"
            label="bit rate"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="filedatafileSize"
            name="filedatafileSize"
            label="file size"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="filename"
            name="filename"
            label="file name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="thumbnailname"
            name="thumbnailname"
            label="thumbnail name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="thumbnailfilename"
            name="thumbnailfilename"
            label="thumbnail filename"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="media added to your collection"
      />
    </div>
  );
}

VideoPlayer.propTypes = {
  currentVideo: PropTypes.object.isRequired,
  updateVideoPlayer: PropTypes.func.isRequired,
};

export default VideoPlayer;