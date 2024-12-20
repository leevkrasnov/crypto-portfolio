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
} from '@utils/calculateMetrics';
import { useCrypto } from '@context/CryptoContext';

export default function TableAssets() {
  const { assets, removeAsset } = useCrypto();

  // Преобразование данных для таблицы
  const data = React.useMemo(
    () =>
      assets.map((asset) => ({
        id: asset.id, // Уникальный идентификатор
        name: asset.coin.name, // Название актива
        sector: asset.sector, // Сектор
        purchaseDate: asset.purchaseDate, // Дата покупки
        priceBuy: `$${asset.priceBuy.toFixed(2)}`, // Цена покупки (форматированная)
        purchaseSum: `$${calculatePurchaseSum(asset).toFixed(2)}`, // Сумма покупки
        saleDate: asset.saleDate || null, // Дата продажи
        priceSell: asset.saleDate ? `$${asset.priceSell.toFixed(2)}` : '—', // Цена продажи
        saleSum: asset.saleDate
          ? `$${calculateSaleSum(asset).toFixed(2)}`
          : '—', // Сумма продажи
        profitLoss: calculateProfitLoss(asset), // Прибыль/убыток
        roi: calculateROI(asset), // ROI
        holdingTime: calculateHoldingTime(asset), // Время удержания
      })),
    [assets]
  );

  // Определение колонок таблицы
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
      {
        accessorKey: 'purchaseSum',
        header: 'Сумма покупки',
      },
      {
        accessorKey: 'saleDate',
        header: 'Дата продажи',
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString()
            : '—',
      },
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
            <span className={value > 0 ? 'text-purple-700' : 'text-gray-900'}>
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

  // Состояние сортировки
  const [sorting, setSorting] = React.useState([]);

  // Создание таблицы с использованием React Table
  const table = useReactTable({
    data, // Данные
    columns, // Колонки
    getCoreRowModel: getCoreRowModel(), // Основная модель строк
    getSortedRowModel: getSortedRowModel(), // Модель сортировки
    state: { sorting }, // Текущее состояние сортировки
    onSortingChange: setSorting, // Обработчик изменения сортировки
  });

  return (
    <div className="w-full h-[500px] overflow-auto scrollbar-thin">
      <table className="table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="sticky top-0 z-10 px-4 py-3 bg-gray-50 text-left cursor-pointer whitespace-nowrap"
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
                <td key={cell.id} className="px-4 py-3">
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
