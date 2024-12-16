import { useCrypto } from '../context/CryptoContext';
import { calculateMetrics } from '../utils/calculateMetrics';

export default function ROIData() {
  const { assets } = useCrypto();
  const metrics = calculateMetrics(assets);

  return (
    <div className="p-4 flex flex-col items-start justify-start">
      <h1 className="text-4xl font-bold">ROI</h1>
      <ul className="space-y-2">
        {metrics.map((asset) => (
          <li
            key={asset.coin.name}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="text-xl font-semibold">{asset.coin.name}</span>
            <span className="text-xl">{asset.roi.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
