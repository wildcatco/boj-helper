import { useEffect, useRef, useState } from 'react';

import { FaPause, FaPlay } from 'react-icons/fa';
import { VscDebugRestart } from 'react-icons/vsc';

import { formatTime } from '@/libs/utils/format';

import styles from './StopWatch.module.scss';

const StopWatch = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeInSecond, setTimeInSecond] = useState(0);
  const stopWatchRef = useRef<NodeJS.Timer | null>(null);

  const togglePlay = () => {
    setIsPlaying((prevIsPlay) => !prevIsPlay);
  };

  const resetPlay = () => {
    setTimeInSecond(0);
    stopWatchRef.current && clearInterval(stopWatchRef.current);
    if (isPlaying) {
      stopWatchRef.current = setInterval(increaseOneSecond, 1000);
    }
  };

  const increaseOneSecond = () => {
    setTimeInSecond((prevTime) => prevTime + 1);
  };

  useEffect(() => {
    if (isPlaying) {
      stopWatchRef.current = setInterval(increaseOneSecond, 1000);
    } else {
      stopWatchRef.current && clearInterval(stopWatchRef.current);
      stopWatchRef.current = null;
    }

    return () => {
      stopWatchRef.current && clearInterval(stopWatchRef.current);
    };
  }, [isPlaying]);

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <div className={styles.button} onClick={resetPlay}>
        <VscDebugRestart className={styles.reset} />
      </div>
      <div className={styles.time}>
        <span>{formatTime(timeInSecond)}</span>
      </div>
    </div>
  );
};

export default StopWatch;
