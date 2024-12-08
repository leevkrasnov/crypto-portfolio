import { Flex, Typography, Divider, Card } from 'antd';
import { useCrypto } from '../context/crypto-context';
import Shiba from './animations/Shiba';

export default function TotalProfit() {
  const { exchangeRate, assets } = useCrypto();

  function calculateTotalProfit() {
    const totalProfitUSD = assets.reduce((total, asset) => {
      const profit =
        asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy;
      return total + profit;
    }, 0);

    return {
      usd: totalProfitUSD,
      rub: exchangeRate ? totalProfitUSD * exchangeRate : null,
    };
  }

  const { usd, rub } = calculateTotalProfit();

  return (
    <Flex
      vertical
      align="start"
      justify="center"
      style={{ marginBottom: '2rem' }}
    >
      <Card className="card">
        <Flex>
          <Typography.Title
            level={2}
            style={{ margin: 0 }}
            className="gradient-text"
          >
            Общая прибыль:
          </Typography.Title>
        </Flex>
        <Divider />
        <Flex align="start" justify="space-between" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
              USD: {usd ? usd.toFixed(2) : 0} $
            </Typography.Title>
            <br />
            <Typography.Title level={3} style={{ margin: 0 }}>
              RUB: {rub ? rub.toFixed(2) : 0} ₽
            </Typography.Title>
          </div>
          <Shiba />
        </Flex>
      </Card>
    </Flex>
  );
}
