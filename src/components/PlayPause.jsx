import { memo } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

export const PlayPause = memo((props) => {
  const { isPlaying, activeSong, song, handlePause, handlePlay } = props;

  return (
    <>
      {isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle size={35} className='text-gray-300' onClick={handlePause} />
      ) : (
        <FaPlayCircle size={35} className='text-gray-300' onClick={handlePlay} />
      )}
    </>
  );
});
