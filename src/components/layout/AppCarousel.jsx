import { Carousel, Spin } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfo from '../CoinInfo';
import MarketCapInfo from '../MarketCapInfo';
import { useEffect } from 'react';
import { calculateAltcoinDominance } from '../MarketCapInfo';

export default function AppCarousel() {
  const { cryptoData, cryptoMarketCap, loading, isDataReady, hasError } =
    useCrypto();

  if (loading) {
    return <Spin fullscreen />;
  }

  if (hasError) {
    return null;
  }

  if (!isDataReady) {
    return null;
  }

  useEffect(() => {
    if (!loading && (!cryptoMarketCap || cryptoMarketCap.length === 0)) {
      openNotification('error', 'Ошибка', 'Данные криптовалют недоступны');
    }
  }, [loading, cryptoMarketCap]);

  if (loading) {
    return <Spin fullscreen />;
  }

  if (!cryptoMarketCap || cryptoMarketCap.length === 0) {
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
      <Carousel
        autoplaySpeed={10000}
        infinite={true}
        style={{ background: '#364d79' }}
      >
        <CoinInfo coin={bitcoin} image="/bitcoin.svg" />
        <CoinInfo coin={ethereum} image="/ethereum.svg" />
        <CoinInfo coin={solana} image="/solana.svg" />
        <MarketCapInfo btcMC={btcMC} altMC={altMC} />
      </Carousel>
    </>
  );
}
