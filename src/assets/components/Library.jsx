import React from 'react';
import { LibrarySong } from './LibrarySong';

export const Library = ({ songs, currentSong, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus && 'active-library'}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map(song => (
          <LibrarySong
            song={song}
            key={song.id}
            songs={songs}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            id={currentSong.id}
          />
        ))}
      </div>
    </div>
  );
};
