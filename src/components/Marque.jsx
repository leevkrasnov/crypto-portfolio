import { calculateTotalProfit } from '../utils/calculateMetrics';
import { formatCurrency } from '../utils/formatCurrency';
import { useCrypto } from '../context/CryptoContext';

export default function Marque() {
  const { exchangeRate, assets } = useCrypto();
  const { usd, rub } = calculateTotalProfit({ exchangeRate, assets });

  return (
    <div className="marque-container">
      <section className="marque-text">
        <p>{usd ? formatCurrency(usd) : 0}</p>
        <p>{rub ? formatCurrency(rub, 'RUB', 'ru-RU') : 0}</p>
      </section>
    </div>
  );
}
