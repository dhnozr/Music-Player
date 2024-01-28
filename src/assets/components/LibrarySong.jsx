import React from 'react';

export const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs, id }) => {
  // handler
  const songSelectHandler = async () => {
    const selectedSong = songs.filter(state => state.id === song.id);
    await setCurrentSong(selectedSong[0]);
    console.log(selectedSong);

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
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
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
