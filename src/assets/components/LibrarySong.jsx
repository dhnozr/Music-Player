import React from 'react';

export const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs }) => {
  // handler

  const songSelectHandler = async () => {
    await setCurrentSong(song);

    const newSongs = songs.map(state => {
      if (state.id === song.id) {
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
    if (isPlaying) audioRef.current.play();

    setSongs(newSongs);
  };
  //

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
      <img src={song?.cover} alt='' />
      <div className='song-description'>
        <h3>{song?.name}</h3>
        <h4>{song?.artist}</h4>
      </div>
    </div>
  );
};
