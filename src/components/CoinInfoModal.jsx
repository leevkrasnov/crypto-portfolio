import { Statistic, Divider, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../context/crypto-context';
import { calculateMetrics } from '../utils/calculateMetrics';

export default function CoinInfoModal() {
  const { assets } = useCrypto();
  const metrics = calculateMetrics(assets);

  if (!assets || assets.length === 0) {
    return <p>Нет данных для отображения</p>;
  }

  return (
    <div>
      <h2 className="text-gray-50 text-6xl font-bold ml-8 mb-20 mt-6">
        Итоговые показатели
      </h2>
      <div className="modal-container">
        {metrics.map((asset) => {
          const isProfit = asset.totalProfit > 0;
          return (
            <Card key={asset.coin.id} className="modal-card">
              <div className="flex justify-start items-center gap-3">
                {/* <img
                src={asset.coin.image}
                alt={asset.coin.name}
                className="w-8"
              /> */}
                <h1 className="text-3xl">{asset.coin.name}</h1>
              </div>

              <Divider />

              <div className="profit-statistic">
                <Statistic
                  title="PNL"
                  value={`${asset.totalProfit.toFixed(2)} $`}
                  prefix={
                    isProfit ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                />

                <Statistic
                  title="ROI"
                  value={`${asset.roi.toFixed(2)} %`}
                  // valueStyle={{ color: isProfit ? 'black' : 'black' }}
                  precision={2}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
