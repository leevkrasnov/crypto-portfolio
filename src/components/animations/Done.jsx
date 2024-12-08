import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Done() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DotLottieReact
        src="./animation/Done.lottie"
        loop
        autoplay
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
}
