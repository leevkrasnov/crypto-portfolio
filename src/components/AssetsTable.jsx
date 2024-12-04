import { useCrypto } from '../context/crypto-context';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const columns = (removeAsset) => [
  {
    title: 'Актив',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
    render: (value) => <span style={{ fontWeight: 'bold' }}>{value}</span>,
  },
  {
    title: 'Цена покупки',
    dataIndex: 'priceBuy',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.priceBuy - b.priceBuy,
  },
  {
    title: 'Цена продажи',
    dataIndex: 'priceSell',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.priceSell - b.priceSell,
  },
  {
    title: 'Прибыль / Убыток',
    dataIndex: 'pL',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.pL - b.pL,
    render: (value) => (
      <span style={{ color: value > 0 ? 'green' : 'red' }}>
        {value.toFixed(2)}
      </span>
    ),
  },
  {
    dataIndex: 'action',
    render: (_, record) => (
      <Button
        style={{ width: 20, height: 20 }}
        type="link"
        danger
        onClick={() => removeAsset(record.id)}
      >
        <DeleteOutlined />
      </Button>
    ),
    width: 60,
  },
];

export default function AssetsTable() {
  const { assets, removeAsset } = useCrypto();

  const data = assets.map((asset) => ({
    key: asset.id,
    id: asset.id,
    name: asset.coin.name,
    priceBuy: asset.priceBuy,
    priceSell: asset.priceSell,
    pL: asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy,
  }));

  return (
    <Table
      pagination={false}
      columns={columns(removeAsset)}
      dataSource={data}
      className="table"
      scroll={{ y: 800 }}
    />
  );
}
