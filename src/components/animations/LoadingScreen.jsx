import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/loadingDog.json';

export default function LoadingScreen({ isDataReady, onAnimationEnd }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // Для скрытия элемента после анимации

  useEffect(() => {
    let interval;

    if (!isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + 10;
          if (nextProgress >= 100) {
            clearInterval(interval);
            setProgress(100);
            return 100;
          }
          return nextProgress;
        });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isComplete]);

  useEffect(() => {
    if (progress === 100 && isDataReady) {
      setTimeout(() => {
        setIsLoaded(true); // Начинаем анимацию исчезновения
        setTimeout(() => {
          setIsHidden(true); // Убираем элемент после завершения анимации
          if (onAnimationEnd) onAnimationEnd();
        }, 700); // Время для завершения `transition-opacity`
      }, 500);
    } else if (isDataReady && progress < 100) {
      setProgress(100);
      setIsComplete(true);
      setTimeout(() => {
        setIsLoaded(true);
        setTimeout(() => {
          setIsHidden(true);
          if (onAnimationEnd) onAnimationEnd();
        }, 1000);
      }, 1000);
    }
  }, [isDataReady, progress, onAnimationEnd]);

  if (isHidden) return null;

  return (
    <div
      className={`relative w-screen h-screen ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="w-60 h-60"
        />
      </div>
      <div className="hidden md:font-quantico md:absolute md:bottom-10 md:left-10 md:text-7xl md:text-gray-800">
        {progress}%
      </div>
    </div>
  );
}
