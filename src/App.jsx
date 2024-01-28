import { useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Player } from './assets/components/Player';
import { Song } from './assets/components/Song';
import './styles/app.scss';
import chillHop from '../chillHop';
import { Library } from './assets/components/Library';
import { Navbar } from './assets/components/Navbar';

function App() {
  // state
  // state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercantege: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  //

  const songEndedHandler = () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const newIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[newIndex]);
    activeLibraryHandler(songs[newIndex]);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  const activeLibraryHandler = nextPrev => {
    const newSongs = songs.map(state => {
      if (state.id === nextPrev.id) {
        return {
          ...state,
          active: true,
        };
      } else {
        return {
          ...state,
          active: false,
        };
      }
    });

    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };

  const timeUpdateHandler = e => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    // calc percentage
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({ ...songInfo, currentTime: currentTime, duration: duration, animationPercantege: animation });
  };

  //
  return (
    <>
      <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
        <Navbar libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
        <Library
          libraryStatus={libraryStatus}
          isPlaying={isPlaying}
          audioRef={audioRef}
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
        <audio
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndedHandler}
        ></audio>
      </div>
    </>
  );
}

export default App;
