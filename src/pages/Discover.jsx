import { useMemo } from 'react';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genres } from '../assets/constants';
import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';

export const Discover = memo(() => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
  const genreTitle = useMemo(
    () => genres.find(({ value }) => value === genreListId)?.title ?? 'Pop',
    [genreListId]
  );

  if (isFetching) return <Loader title='Loading songs......' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>

        <select
          value={genreListId ?? 'Pop'}
          className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none mt-5 sm:mt-0'
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, idx) => (
          <SongCard
            key={song.key}
            song={song}
            i={idx}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
});
