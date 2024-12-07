import { Typography, Statistic, Divider, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../context/crypto-context';
import { calculateMetrics } from '../utils/calculateMetrics';

export default function CoinProfitModal() {
  const { assets } = useCrypto();
  const metrics = calculateMetrics(assets);

  if (!assets || assets.length === 0) {
    return <Typography.Text>Нет данных для отображения</Typography.Text>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        gap: '3rem',
        margin: '2rem 6rem 8rem',
      }}
    >
      {metrics.map((asset) => {
        const isProfit = asset.totalProfit > 0;
        return (
          <Card
            key={asset.coin.id}
            style={{ width: '460px', marginBottom: '12px' }}
            className="shadow"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <img
                src={asset.coin.image}
                alt={asset.coin.name}
                style={{ width: 30, height: 30 }}
              />
              <Typography.Title level={3} style={{ margin: 0 }}>
                {asset.coin.name}
              </Typography.Title>
            </div>

            <Divider />

            <div className="profit-statistic">
              <div
                style={{
                  flex: 1,
                }}
              >
                <Statistic
                  title="Общий PnL ($)"
                  value={`${asset.totalProfit.toFixed(2)} $`}
                  precision={2}
                  valueStyle={{ color: isProfit ? '#3f8600' : '#cf1322' }}
                  prefix={
                    isProfit ? <CaretUpOutlined /> : <CaretDownOutlined />
                  }
                />

                <Statistic
                  title="Общий PnL (%)"
                  value={`${asset.totalPnLPercent.toFixed(2)} %`}
                  precision={2}
                  valueStyle={{ color: isProfit ? '#3f8600' : '#cf1322' }}
                  style={{ marginTop: '12px' }}
                />
                <Statistic
                  title="ROI (%)"
                  value={`${asset.roi.toFixed(2)} %`}
                  precision={2}
                  style={{ marginTop: '12px' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <Statistic
                  title="Средняя цена продажи ($)"
                  value={`${asset.averageSellPrice.toFixed(2)} $`}
                  precision={2}
                />
                <Statistic
                  title="Средняя цена покупки ($)"
                  value={`${asset.averageBuyPrice.toFixed(2)} $`}
                  precision={2}
                  style={{ marginTop: '12px' }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
