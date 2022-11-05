import { useEffect } from 'react';
import { memo, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper';
import { PlayPause } from './PlayPause';

const TopChartCard = memo((props) => {
  const { song, i, isPlaying, activeSong, handlePlayClick, handlePauseClick } = props;

  return (
    <div className='w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2'>
      <h3 className='font-bold text-base text-white mr-3'>{i + 1}.</h3>

      <div className='flex-1 flex flex-row justify-between items-center'>
        <img
          src={song?.images?.coverart}
          alt={song?.title}
          width={80}
          height={80}
          decoding='async'
          loading='lazy'
          className='w-20 h-20 rounded-lg'
        />

        <div className='flex-1 flex flex-col justify-center mx-3'>
          <Link to={`/songs/${song?.key}`}>
            <p className='text-l font-bold text-white'>{song?.title}</p>
          </Link>

          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className='text-base text-gray-300 mt-1'>{song?.subtitle}</p>
          </Link>
        </div>
      </div>

      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
});

export const TopPlay = memo(() => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  const divRef = useRef(null);

  const handlePauseClick = useCallback(() => {
    dispatch(playPause(false));
  }, []);

  const handlePlayClick = useCallback((song, i) => {
    dispatch(playPause(true));
    dispatch(setActiveSong({ song, data, i }));
  }, []);

  const topPlays = useMemo(() => data?.slice(0, 5), [data]);

  useEffect(() => divRef.current.scrollIntoView({ behavior: 'smooth' }));

  return (
    <div
      ref={divRef}
      className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'
    >
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>

          <Link to='/top-charts'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, idx) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={idx}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, idx)}
            />
          ))}
        </div>
      </div>

      {/* SWIPER */}

      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>

          <Link to='/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {topPlays?.map((song, idx) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className='shadow-lg rounded-full animate-slideright'
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt='name'
                  decoding='async'
                  loading='lazy'
                  className='rounded-full w-full object-cover'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
});
