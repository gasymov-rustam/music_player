/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect, memo } from 'react';

export const Player = memo((props) => {
  const ref = useRef(null);
  const { activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat } =
    props;

  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.hub?.actions?.[1]?.uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
});
