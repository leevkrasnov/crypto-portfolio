import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Shiba() {
  return (
    <DotLottieReact
      src="./animation/Shiba.lottie"
      loop
      autoplay
      speed={0.3}
      style={{ height: '90px', width: '90px' }}
    />
  );
}
