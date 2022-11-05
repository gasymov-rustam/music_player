import { useCallback } from 'react';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { PlayPause } from './PlayPause';

export const SongCard = memo((props) => {
  const { song, i, activeSong, isPlaying, data } = props;
  const dispatch = useDispatch();
  // const {} = useSelector();

  const handlePauseClick = useCallback(() => {
    dispatch(playPause(false));
  }, []);

  const handlePlayClick = useCallback(() => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, data, i }));
  }, []);

  return (
    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'
          }`}
        >
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img
          src={song.images?.coverart}
          alt='song_img'
          width={218}
          height={218}
          decoding='async'
          loading='lazy'
          className='img'
        />
      </div>

      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'>
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>

        <p className='text- truncate text-gray-300 mt-1'>
          <Link to={song?.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
});
