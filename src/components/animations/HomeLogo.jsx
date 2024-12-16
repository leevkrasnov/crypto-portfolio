import Lottie from 'lottie-react';
import animationData from '../../assets/homeLogo.json';

export default function HomeLogo() {
  return (
    <div>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-60 overflow-hidden z-0 rotate-90"
      />
    </div>
  );
}
