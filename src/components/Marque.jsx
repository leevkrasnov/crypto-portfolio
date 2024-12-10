import { calculateTotalProfit } from '../utils/calculateMetrics';
import { formatCurrency } from '../utils/formatCurrency';
import { useCrypto } from '../context/crypto-context';

export default function Marque() {
  const { exchangeRate, assets } = useCrypto();
  const { usd, rub } = calculateTotalProfit({ exchangeRate, assets });

  return (
    <div className="marque-container">
      <p className="marque-text">
        <p>{usd ? formatCurrency(usd) : 0}</p>
        <p>{rub ? formatCurrency(rub, 'RUB', 'ru-RU') : 0}</p>
      </p>
    </div>
  );
}
