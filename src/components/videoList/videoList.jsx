import './videolist.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// eslint-disable-next-line react/prop-types
function VideoList({ startPlayVideo, updateVideoList, stateNewList }) {

    const [medias, setMedias] = useState([]);
    // const theme = useTheme();

    useEffect(() => {
        console.log("empezo el beta");
        BringMediaList();
    }, []);

    useEffect(() => {
        console.log("se activo en el videolist");
        if (updateVideoList == true) {
            setMedias([]);
            BringMediaList();
            stateNewList(false);
        }
    }, [updateVideoList, stateNewList]);

    const BringMediaList = async () => {

        const medias = await axios.get('http://localhost:3000/getmedias');

        if (medias.data) {
            setMedias(medias.data);
        }
    };

    const playVideo = (media) => {
        console.log("se ejecuto el pana", media);
        startPlayVideo(media);
    };

    return (
        <div className='VideoList'>
            {
                medias != [] ? medias.map(media => {
                    return (
                        <Card sx={{ display: 'flex' }} key={media.id} className='card'>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {media.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        {media.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="play/pause" onClick={() => playVideo(media)}>
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={media.thumbnail.thumbnailroute}
                                alt="Live from space album cover"
                            />
                        </Card>
                    );
                })
                    : "no videos available"
            }
        </div>
    );
}

export default VideoList;