import { memo } from 'react';
import { SongBar } from './SongBar';

export const RelatedSongs = memo((props) => {
  const { data, isPlaying, activeSong, artistId, handlePauseClick, handlePlayClick } = props;

  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-white'>Related Songs:</h1>

      <div className='mt-6 w-full flex flex-col'>
        {data?.map((song, idx) => (
          <SongBar
            key={`${song?.key}-${artistId}-${idx}`}
            song={song}
            i={idx}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlayClick={handlePlayClick}
            handlePauseClick={handlePauseClick}
          />
        ))}
      </div>
    </div>
  );
});
