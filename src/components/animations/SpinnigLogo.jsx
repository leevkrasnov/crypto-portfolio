import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const SpinningLogo = ({ isDataReady, onAnimationEnd }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    if (isDataReady) {
      setIsMoving(true);
    }
  }, [isDataReady]);

  useEffect(() => {
    if (isMoving) {
      const stopSpinTimer = setTimeout(() => {
        setIsSpinning(false);
      }, 200); // Остановить вращение

      // Завершаем анимацию полностью
      const finishAnimationTimer = setTimeout(() => {
        if (onAnimationEnd) onAnimationEnd();
      }, 2000);

      return () => {
        clearTimeout(stopSpinTimer);
        clearTimeout(finishAnimationTimer);
      };
    }
  }, [isMoving, onAnimationEnd]);

  return (
    <div
      className={`fixed ${
        isMoving
          ? 'top-3 left-16 w-32 h-32'
          : 'top-1/2 left-1/2 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2'
      } transition-all duration-1000 ease-in-out`}
    >
      <Logo className={isSpinning ? 'animate-spin' : ''} />
    </div>
  );
};

export default SpinningLogo;
