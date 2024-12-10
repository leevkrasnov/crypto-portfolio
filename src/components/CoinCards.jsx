import { useCrypto } from '../context/crypto-context';
import CoinInfo from './CoinInfo';

export default function CoinCards() {
  const { cryptoData, isDataReady, hasError } = useCrypto();

  if (hasError) {
    return null;
  }

  if (!isDataReady) {
    return null;
  }

  const bitcoin = cryptoData.find((coin) => coin.id === 'bitcoin');
  const ethereum = cryptoData.find((coin) => coin.id === 'ethereum');

  return (
    <>
      <CoinInfo coin={bitcoin} image="/bitcoin.svg" />
      <CoinInfo coin={ethereum} image="/ethereum.svg" />
    </>
  );
}
