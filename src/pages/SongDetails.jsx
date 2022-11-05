import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

export const SongDetails = memo(() => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songId });
  const {
    data: relatedSongs,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({
    songId,
  });

  const handlePauseClick = useCallback(() => {
    dispatch(playPause(false));
  }, []);

  const handlePlayClick = useCallback((song, i) => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, relatedSongs, i }));
  }, []);

  if (isFetchingRelatedSongs || isFetchingSongDetails) {
    return <Loader title='Searching song details' />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='flex flex-col'>
      <DetailsHeader songData={songData} />

      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>

        <div className='mt-5'>
          {songData?.sections?.[1].type === 'LYRICS' ? (
            songData?.sections?.[1].text.map((line, i) => (
              <p key={i} className='text-gray-400 text-base my-1'>
                {line}
              </p>
            ))
          ) : (
            <p className='text-gray-400 text-base my-1'>Sorry, no Lyrics found!</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
});
