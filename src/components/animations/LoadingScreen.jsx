import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@assets/animations/loadingDog.json';

export default function LoadingScreen({ isDataReady, onAnimationEnd }) {
  const [isHidden, setIsHidden] = useState(false);

  // Эффект: Скрытие компонента после завершения загрузки
  useEffect(() => {
    if (isDataReady) {
      const hideTimeout = setTimeout(() => {
        setIsHidden(true);
        if (onAnimationEnd) onAnimationEnd();
      }, 1000); // Длительность анимации исчезновения

      return () => clearTimeout(hideTimeout); // Очищаем таймер при размонтировании
    }
  }, [isDataReady, onAnimationEnd]);

  // Если компонент должен быть скрыт, ничего не рендерим
  if (isHidden) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-dark-200 z-50 flex items-center justify-center ${
        isDataReady ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-500`}
    >
      {/* Анимация загрузки */}
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-60 h-60"
      />
    </div>
  );
}
