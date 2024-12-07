import { useState } from 'react';
import { useCrypto } from '../context/crypto-context';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import {
  calculatePurchaseSum,
  calculateSaleSum,
  calculateProfitLoss,
  calculatePercentChange,
  calculateROI,
  calculateHoldingTime,
} from '../utils/calculateMetrics';

const getColumns = (removeAsset) => [
  {
    title: 'Актив',
    width: 120,
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (value) => <span className="table-bold">{value}</span>,
  },
  {
    title: 'Дата покупки',
    width: 160,
    dataIndex: 'purchaseDate',
    sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Цена покупки',
    width: 160,
    dataIndex: 'priceBuy',
    sorter: (a, b) => a.priceBuy - b.priceBuy,
    render: (value) => `$${value}`,
  },
  {
    title: 'Количество',
    width: 160,
    dataIndex: 'amountBuy',
    sorter: (a, b) => a.amountBuy - b.amountBuy,
  },
  {
    title: 'Сумма покупки',
    width: 160,
    dataIndex: 'purchaseSum',
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    title: 'Дата продажи',
    width: 160,
    dataIndex: 'saleDate',
    sorter: (a, b) => new Date(a.saleDate) - new Date(b.saleDate),
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Цена продажи',
    width: 160,
    dataIndex: 'priceSell',
    sorter: (a, b) => a.priceSell - b.priceSell,
    render: (value) => `$${value}`,
  },
  {
    title: 'Сумма продажи',
    width: 160,
    dataIndex: 'saleSum',
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    title: 'PnL',
    width: 120,
    dataIndex: 'profitLoss',
    sorter: (a, b) => a.profitLoss - b.profitLoss,
    render: (value) => (
      <span
        className={
          value > 0 ? 'table-profit-positive' : 'table-profit-negative'
        }
      >
        ${value.toFixed(2)}
      </span>
    ),
  },
  {
    title: 'PnL, %',
    width: 120,
    dataIndex: 'percentChange',
    render: (value) => `${value}%`,
  },
  {
    title: 'ROI',
    width: 120,
    dataIndex: 'roi',
    render: (value) => `${value}%`,
  },
  {
    title: 'Время удержания',
    width: 160,
    dataIndex: 'holdingTime',
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
  const [tableOpen, setTableOpen] = useState(false);

  const toggleTableVisibility = () => {
    setTableOpen((prev) => !prev); // Переключение состояния
  };

  const tableData = assets.map((asset) => ({
    key: asset.id,
    id: asset.id,
    name: asset.coin.name,
    purchaseDate: asset.purchaseDate,
    priceBuy: asset.priceBuy,
    amountBuy: asset.amountBuy,
    purchaseSum: calculatePurchaseSum(asset),
    saleDate: asset.saleDate,
    priceSell: asset.priceSell,
    saleSum: asset.saleDate ? calculateSaleSum(asset) : null,
    profitLoss: calculateProfitLoss(asset),
    percentChange: calculatePercentChange(asset),
    roi: calculateROI(asset),
    holdingTime: calculateHoldingTime(asset),
  }));

  return (
    <div>
      <button onClick={toggleTableVisibility} className="buttonOpenTable">
        {tableOpen ? 'Скрыть таблицу' : 'Показать таблицу'}
      </button>
      {tableOpen && (
        <Table
          pagination={false}
          columns={getColumns(removeAsset)}
          dataSource={tableData}
          scroll={{ x: 600, y: 800 }}
          className="table"
        />
      )}
    </div>
  );
}
