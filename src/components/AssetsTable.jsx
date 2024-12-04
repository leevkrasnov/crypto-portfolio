import { useCrypto } from '../context/crypto-context';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const calculateProfitLoss = (asset) => {
  return asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy;
};

const getColumns = (removeAsset) => [
  {
    title: 'Актив',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
    render: (value) => <span className="table-bold">{value}</span>,
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
      <span
        className={
          value > 0 ? 'table-profit-positive' : 'table-profit-negative'
        }
      >
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

  const tableData = assets.map((asset) => ({
    key: asset.id,
    id: asset.id,
    name: asset.coin.name,
    priceBuy: asset.priceBuy,
    priceSell: asset.priceSell,
    pL: calculateProfitLoss(asset),
  }));

  return (
    <Table
      pagination={false}
      columns={getColumns(removeAsset)}
      dataSource={tableData}
      className="table"
      scroll={{ y: 800 }}
    />
  );
}
