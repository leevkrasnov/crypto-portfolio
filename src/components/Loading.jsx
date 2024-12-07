import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Высота области для центрирования
      }}
    >
      <DotLottieReact
        src="/assets/animation/Animation.lottie"
        loop
        autoplay
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
}
