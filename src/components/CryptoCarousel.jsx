import { Carousel } from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinInfoCarousel from './CoinInfoCarousel';
import MarketCapInfo from './MarketCapInfo';
import { calculateAltcoinDominance } from './MarketCapInfo';

export default function CryptoCarousel() {
  const { cryptoData, cryptoMarketCap, isDataReady, hasError } = useCrypto();

  if (hasError) {
    return null;
  }

  if (!isDataReady) {
    return null;
  }

  const bitcoin = cryptoData.find((coin) => coin.id === 'bitcoin');
  const ethereum = cryptoData.find((coin) => coin.id === 'ethereum');
  const solana = cryptoData.find((coin) => coin.id === 'solana');
  const btcMC = cryptoMarketCap?.data?.market_cap_percentage?.btc || 0;
  const altMC = cryptoMarketCap
    ? calculateAltcoinDominance(cryptoMarketCap.data.market_cap_percentage)
    : 0;

  return (
    <>
      <Carousel autoplay autoplaySpeed={5000} infinite={true}>
        <CoinInfoCarousel coin={bitcoin} image="/bitcoin.svg" />
        <CoinInfoCarousel coin={ethereum} image="/ethereum.svg" />
        <CoinInfoCarousel coin={solana} image="/solana.svg" />
        <MarketCapInfo btcMC={btcMC} altMC={altMC} />
      </Carousel>
    </>
  );
}
