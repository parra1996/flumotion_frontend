import { useEffect, useState } from 'react';
import './videoplayer.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import axios from 'axios';

// eslint-disable-next-line react/prop-types
function VideoPlayer({ currentVideo }) {

  const videoPlayerUrl = 'https://cdnapi.codev8.net/cms-player/default.iframe?injectSrc=';
  const [videoData, setVideoData] = useState({});
  const [open, setOpen] = useState(false);
  const [mediaData, setMediaData] = useState({
    title: '', description: '', duration: '', tags: '', filedata: { bitrate: 0, fileSize: 0, filename: '' }, thumbnail: { name: '', filename: '' }
  });

  useEffect(() => {
    setVideoData(currentVideo);
    console.log(currentVideo, "esto es video actualizado");
  }, [currentVideo]);

  useEffect(() => {
    console.log(mediaData);
    createMedia(mediaData);
  }, [mediaData]);

  const createMedia = async (data) => {
    const newMedia = await axios.post('http://localhost:3000/addmedias', data);
    if (newMedia) {
      console.log(newMedia);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className='VideoPlayer'>
      <div className="iframe">
        <iframe
          // eslint-disable-next-line react/prop-types
          src={videoData ? `${videoPlayerUrl}${currentVideo.mediaroute}` : videoPlayerUrl}
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
            videoData ? <>
              Título: {videoData.title}<br></br>
              Descripcion: {videoData.description}<br></br>
            </>
              : "no hay data"
          }
        </div>
        <div className='addMedia'>
          <Button variant="contained" color='success' onClick={handleClickOpen}>add media</Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            setMediaData({
              title: formJson.title,
              description: formJson.description,
              duration: formJson.duration,
              tags: formJson.tags,
              filedata: {
                bitrate: formJson.filedatabitrate,
                fileSize: formJson.filedatafileSize,
                filename: formJson.filename
              },
              thumbnail: {
                name: formJson.thumbnailname,
                filename: formJson.thumbnailfilename
              }
            });
            handleClose();
          },
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
    </div>
  );
}

export default VideoPlayer;