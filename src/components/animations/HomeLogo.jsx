import Lottie from 'lottie-react';
import animationData from '../../assets/homeLogo.json'; // Замените на путь к вашему файлу

export default function HomeLogo() {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
}
