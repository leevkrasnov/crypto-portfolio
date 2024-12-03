import { Flex, Typography, Statistic, Divider, Card } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';

export function calculateAltcoinDominance(marketCapPercentage) {
  return Object.entries(marketCapPercentage)
    .filter(([coin]) => coin !== 'btc')
    .reduce((total, [, dominance]) => total + dominance, 0);
}

export default function MarketCapInfo({ btcMC, altMC }) {
  return (
    <Flex vertical align="center" justify="center">
      <Card className="card">
        <Flex>
          <img
            src="/miner.svg"
            alt="miner"
            style={{ width: 40, marginRight: 10 }}
          />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Market Cap
          </Typography.Title>
        </Flex>
        <Divider />
        <Flex style={{ justifyContent: 'space-between' }}>
          <Statistic
            title="Bitcoin"
            value={btcMC}
            precision={2}
            prefix={<PercentageOutlined />}
          />

          <Statistic
            title="Altcoins"
            value={altMC}
            precision={2}
            prefix={<PercentageOutlined />}
          />
        </Flex>
      </Card>
    </Flex>
  );
}
