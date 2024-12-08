import { Carousel } from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinInfoCarousel from './CoinInfoCarousel';

export default function CryptoCarousel() {
  const { cryptoData, isDataReady, hasError } = useCrypto();

  if (hasError) {
    return null;
  }

  if (!isDataReady) {
    return null;
  }

  const bitcoin = cryptoData.find((coin) => coin.id === 'bitcoin');
  const ethereum = cryptoData.find((coin) => coin.id === 'ethereum');
  const solana = cryptoData.find((coin) => coin.id === 'solana');

  return (
    <>
      <Carousel effect="fade" autoplay autoplaySpeed={8000} infinite={true}>
        <CoinInfoCarousel coin={bitcoin} image="/bitcoin.svg" />
        <CoinInfoCarousel coin={ethereum} image="/ethereum.svg" />
        <CoinInfoCarousel coin={solana} image="/solana.svg" />
      </Carousel>
    </>
  );
}
