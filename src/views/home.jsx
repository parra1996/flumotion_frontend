import './home.css';
import VideoPlayer from '../components/videoplayer/videoplayer';
import VideoList from '../components/videoList/videoList';
import { useEffect, useState } from 'react';

function Home() {

  const [messageVideoList, setMessageVideoList] = useState({});
  const [currentVideoP, setCurrentVideoP] = useState({});
  const [messageVideoPlayer, setMessageVideoPlayer] = useState({});

  useEffect(() => {
    setCurrentVideoP(messageVideoList);
  }, [messageVideoList]);

  // useEffect(() => {
  // }, [messageVideoPlayer]);

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
        <VideoPlayer
          currentVideo={currentVideoP}
          updateVideoPlayer={handleVideoPlayer}
        />
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