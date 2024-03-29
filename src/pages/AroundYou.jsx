import axios from 'axios';
import { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const GEO_API_KEY = 'at_zJwkjGVesQIeXMkyoEHRc90sruBk2';
const GEO_API = `https://geo.ipify.org/api/v2/country?apiKey=${GEO_API_KEY}`;

export const AroundYou = memo(() => {
  const [country, setCountry] = useState('UA');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios
      .get(GEO_API)
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title='Loading songs around you' />;

  if (error && country) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
        Around You
        <span className='font-black'> {country}</span>
      </h2>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, idx) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={idx}
          />
        ))}
      </div>
    </div>
  );
});
