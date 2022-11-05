import { memo } from 'react';

export const Error = memo(() => (
  <div className='w-full flex justify-center items-center'>
    <h1 className='font-bold text-2xl text-white mt-20'>Something went wrong. Please try again.</h1>
  </div>
));
