import { useCrypto } from '../context/CryptoContext';
import CoinInfo from './CoinInfo';

export default function CoinCards() {
  const { cryptoData } = useCrypto();

  const bitcoin = cryptoData.find((coin) => coin.id === 'bitcoin');
  const ethereum = cryptoData.find((coin) => coin.id === 'ethereum');

  return (
    <>
      <CoinInfo coin={bitcoin} image="/bitcoin.svg" />
      <CoinInfo coin={ethereum} image="/ethereum.svg" />
    </>
  );
}
