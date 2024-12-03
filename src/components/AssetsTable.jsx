import { useCrypto } from '../context/crypto-context';
import { Table } from 'antd';

const columns = [
  {
    title: 'Актив',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
    render: (value) => <span style={{ fontWeight: 'bold' }}>{value}</span>,
  },
  {
    title: 'Цена покупки, $',
    dataIndex: 'priceBuy',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.priceBuy - b.priceBuy,
  },
  {
    title: 'Цена продажи, $',
    dataIndex: 'priceSell',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.priceSell - b.priceSell,
  },
  {
    title: 'Прибыль / Убыток, $',
    dataIndex: 'pL',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.pL - b.pL,
    render: (value) => (
      <span style={{ color: value > 0 ? 'green' : 'red' }}>
        {value.toFixed(2)}
      </span>
    ),
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((asset, index) => ({
    key: index,
    name: asset.coin.name,
    priceBuy: asset.priceBuy,
    priceSell: asset.priceSell,
    pL: asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy,
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      className="table"
      scroll={{ y: 800 }}
    />
  );
}
