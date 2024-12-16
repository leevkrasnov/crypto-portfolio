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
    // <div
    //   className={`fixed inset-0 flex flex-col items-center justify-center bg-[#9fb3a2] text-gray-50 ${
    //     isLoaded ? 'opacity-0' : 'opacity-100'
    //   } transition-opacity duration-500 ease-in-out`}
    // >
    //   <div className="relative w-[20%] h-8 shadow-2xl border border-black bg-gray-200  overflow-hidden">
    //     <div
    //       className="absolute top-0 left-0 h-full bg-[#2C372E] ease-linear transition-[width] duration-[500ms]"
    //       style={{ width: `${progress}%` }}
    //     />
    //   </div>
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
      <div className="font-quantico absolute bottom-10 left-10 text-7xl text-gray-800">
        {progress}%
      </div>
    </div>
  );
}
