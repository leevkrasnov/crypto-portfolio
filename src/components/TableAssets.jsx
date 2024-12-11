import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Button } from 'antd';
import {
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import {
  calculatePurchaseSum,
  calculateSaleSum,
  calculateProfitLoss,
  calculateROI,
  calculateHoldingTime,
} from '../utils/calculateMetrics';
import { useCrypto } from '../context/crypto-context';

export default function TableAssets() {
  const { assets, removeAsset } = useCrypto();

  const data = React.useMemo(
    () =>
      assets.map((asset) => ({
        id: asset.id,
        name: asset.coin.name,
        sector: asset.sector,
        purchaseDate: asset.purchaseDate,
        priceBuyRaw: asset.priceBuy, // Используем для сортировки
        priceBuy: `$${asset.priceBuy.toFixed(2)}`,
        amountBuy: asset.amountBuy,
        purchaseSum: calculatePurchaseSum(asset).toFixed(2),
        saleDate: asset.saleDate || null,
        priceSellRaw: asset.saleDate ? asset.priceSell : null, // Используем для сортировки
        priceSell: asset.saleDate ? `$${asset.priceSell.toFixed(2)}` : '—',
        saleSum: asset.saleDate
          ? `$${calculateSaleSum(asset).toFixed(2)}`
          : '—',
        profitLoss: calculateProfitLoss(asset),
        roi: calculateROI(asset),
        holdingTime: calculateHoldingTime(asset),
      })),
    [assets]
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Актив',
        cell: (info) => <span className="font-bold">{info.getValue()}</span>,
      },
      {
        accessorKey: 'sector',
        header: 'Сектор',
      },
      {
        accessorKey: 'purchaseDate',
        header: 'Дата покупки',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      // {
      //   accessorKey: 'priceBuyRaw',
      //   header: 'Цена покупки',
      //   cell: (info) => `$${info.getValue().toFixed(2)}`,
      // },
      // {
      //   accessorKey: 'amountBuy',
      //   header: 'Количество',
      // },
      {
        accessorKey: 'purchaseSum',
        header: 'Сумма покупки',
        cell: (info) => `$${info.getValue()}`,
      },
      {
        accessorKey: 'saleDate',
        header: 'Дата продажи',
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString()
            : '—',
      },
      // {
      //   accessorKey: 'priceSellRaw',
      //   header: 'Цена продажи',
      //   cell: (info) =>
      //     info.getValue() ? `$${info.getValue().toFixed(2)}` : '—',
      // },
      {
        accessorKey: 'saleSum',
        header: 'Сумма продажи',
      },
      {
        accessorKey: 'profitLoss',
        header: 'PnL',
        cell: (info) => {
          const value = info.getValue();
          return (
            <span
              className={
                value > 0 ? 'table-profit-positive' : 'table-profit-negative'
              }
            >
              ${value.toFixed(2)}
            </span>
          );
        },
      },
      {
        accessorKey: 'roi',
        header: 'ROI',
        cell: (info) => `${info.getValue().toFixed(2)}%`,
      },
      {
        accessorKey: 'holdingTime',
        header: 'Время удержания',
        cell: (info) => `${info.getValue()} дней`,
      },
      {
        id: 'actions',
        header: ' ',
        cell: ({ row }) => (
          <Button
            style={{ width: 20, height: 20 }}
            type="link"
            onClick={() => removeAsset(row.original.id)}
          >
            <DeleteOutlined className="text-gray-600 hover:text-purple-700 hover:scale-110 duration-500" />
          </Button>
        ),
      },
    ],
    [removeAsset]
  );

  // Создание таблицы
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="table-container">
      <table className="table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="table-header"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === 'desc' ? (
                      <ArrowDownOutlined className="ml-1" />
                    ) : (
                      <ArrowUpOutlined className="ml-1" />
                    )
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="table-content">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
