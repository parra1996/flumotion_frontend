import './home.css';
import VideoPlayer from '../components/videoplayer/videoplayer';
import VideoList from '../components/videoList/videoList';
import { useEffect, useState } from 'react';

function Home() {

  const [messageVideoList, setMessageVideoList] = useState({});
  const [currentVideo, setCurrentVideo] = useState({});
  const [messageVideoPlayer, setMessageVideoPlayer] = useState({});

  useEffect(() => {
    console.log(messageVideoList);
    setCurrentVideo(messageVideoList);
  }, [messageVideoList]);

  useEffect(() => {
    console.log("cambio de valor mi pana", messageVideoPlayer);
  }, [messageVideoPlayer]);

  const handleVideoList = (msg) => {
    setMessageVideoList(msg);
  };

  const handleVideoPlayer = (msg) => {
    setMessageVideoPlayer(msg);
  };

  const handleStateNewList = (value) => {
    setMessageVideoPlayer(value);
  };

  return (
    <div className='home'>
      <div className="videoPlayer">
        <VideoPlayer currentVideo={currentVideo} updateVideoPlayer={handleVideoPlayer} />
      </div>
      <div className="videoList">
        <VideoList
          startPlayVideo={handleVideoList}
          updateVideoList={messageVideoPlayer}
          stateNewList={handleStateNewList}
        />
      </div>
    </div>
  );
}

export default Home;