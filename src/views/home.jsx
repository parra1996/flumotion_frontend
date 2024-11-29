import './home.css';
import VideoPlayer from '../components/videoplayer/videoplayer';
import VideoList from '../components/videoList/videoList';
import { useEffect, useState } from 'react';

function Home() {

  const [messageVideoList, setMessageVideoList] = useState({});
  const [currentVideo, setCurrentVideo] = useState({});

  useEffect(() => {
    console.log(messageVideoList);
    setCurrentVideo(messageVideoList);
  }, [messageVideoList]);

  const handleVideoList = (msg) => {
    setMessageVideoList(msg);
  };

  return (
    <div className='home'>
      <div className="videoPlayer">
        <VideoPlayer currentVideo={currentVideo} />
      </div>
      <div className="videoList">
        <VideoList startPlayVideo={handleVideoList} />
      </div>
    </div>
  );
}

export default Home;