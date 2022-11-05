import { memo } from 'react';
import { loader } from '../assets';

export const Loader = memo(({ title = 'Loading' }) => (
  <div className='w-full flex justify-center items-center flex-col'>
    <img
      src={loader}
      alt='loader'
      width={128}
      height={128}
      decoding='async'
      loading='lazy'
      className='w-32 h-32 object-contain'
    />

    <h1 className='font-bold text-2xl text-white mt-20'>{title}</h1>
  </div>
));
