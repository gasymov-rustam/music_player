import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

export const ArtistCard = memo((props) => {
  const { track } = props;
  const navigate = useNavigate();

  return (
    <div
      className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <img
        src={track?.images?.coverart}
        alt='artist'
        decoding='async'
        loading='lazy'
        className='w-full h-56 rounded-lg'
      />

      <p className='mt-4 font-semibold text-lg text-white truncate'>{track?.subtitle}</p>
    </div>
  );
});
