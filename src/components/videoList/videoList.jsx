import './videolist.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function VideoList({ startPlayVideo, updateVideoList, stateNewList }) {

    const [medias, setMedias] = useState([]);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        BringMediaList();
    }, []);

    useEffect(() => {
        if (updateVideoList == true) {
            setMedias([]);
            BringMediaList();
            stateNewList(false);
        }
    }, [updateVideoList]);

    const BringMediaList = async () => {
        try {
            const medias = await axios.get('http://localhost:3000/getmedias');
            if (medias.data) {
                setMedias(medias.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const playVideo = (media) => {
        setActiveCard(media.id);
        startPlayVideo(media);
    };

    return (
        <div className='VideoList'>
            {
                medias.length > 0 ? medias.map(media => {
                    const isActive = media.id === activeCard;
                    return (
                        <Card sx={{ display: 'flex', }} key={media.id} className={`card ${isActive ? 'active' : ''}`} onClick={() => playVideo(media)}>
                            <CardMedia
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                component="img"
                                image={media.thumbnail.thumbnailroute}
                                alt={media.title}
                            />
                            <CardContent sx={{ padding: 0 }} className='cardcontent'>
                                <Typography >
                                    <span>{media.title}</span>
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })
                    : "no videos available"
            }
        </div >
    );
}

VideoList.propTypes = {
    startPlayVideo: PropTypes.func.isRequired,
    updateVideoList: PropTypes.object.isRequired,
    stateNewList: PropTypes.func.isRequired,
};

export default VideoList;