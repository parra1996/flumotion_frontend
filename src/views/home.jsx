import './home.css';
import VideoPlayer from '../components/videoplayer/videoplayer';
import VideoList from '../components/videoList/videoList';
import { useEffect, useState } from 'react';

function Home() {

  const [messageVideoList, setMessageVideoList] = useState({});

  useEffect(() => {
  }, []);

  useEffect(() => {
    console.log(messageVideoList);
  }, [messageVideoList]);

  const handleVideoList = (msg) => {
    setMessageVideoList(msg);
  };

  return (
    <div className='home'>
      <div className="videoPlayer">
        <VideoPlayer currentVideo={setMessageVideoList} />
      </div>
      <div className="videoList">
        <VideoList startPlayVideo={handleVideoList} />
      </div>
    </div>
  );
}

export default Home;