import { Flex, Typography, Divider, Card } from 'antd';
import { useCrypto } from '../context/crypto-context';

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
    <Flex vertical align="center" justify="center" style={{ margin: '2rem' }}>
      <Card className="card">
        <Flex>
          <Typography.Title
            level={2}
            style={{ margin: 0 }}
            className="black-white-text"
          >
            Общая прибыль:
          </Typography.Title>
        </Flex>
        <Divider />
        <Flex>
          <Typography.Title
            level={4}
            style={{ margin: 0 }}
            className="monospace-text"
          >
            USD: {usd ? usd.toFixed(2) : 0} $
          </Typography.Title>
        </Flex>
        <br />
        <Flex>
          <Typography.Title
            level={4}
            style={{ margin: 0 }}
            className="monospace-text"
          >
            RUB: {rub ? rub.toFixed(2) : 0} ₽
          </Typography.Title>
        </Flex>
      </Card>
    </Flex>
  );
}