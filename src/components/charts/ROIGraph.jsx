import { useCrypto } from '@context/CryptoContext';
import { calculateMetrics } from '@utils/calculateMetrics';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function ROIGraph() {
  const { assets } = useCrypto();
  const metrics = assets && assets.length > 0 ? calculateMetrics(assets) : [];

  // Проверка, есть ли данные для отображения
  if (!metrics || metrics.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        Нет данных для отображения графика ROI
      </div>
    );
  }

  const data = {
    labels: metrics.map((asset) => asset.coin.name),
    datasets: [
      {
        label: 'ROI (%)',
        data: metrics.map((asset) => asset.roi),
        borderWidth: 1.2,
        pointRadius: 6,
        pointStyle: 'rect',
        pointBackgroundColor: '#f9fafb',
        hoverRadius: 8,
        hoverBackgroundColor: '#9FB3A2',
        borderColor: '#6b7280',
        tension: 0.1,
      },
    ],
  };

  // Настройки графика
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return metrics[index].coin.name;
          },
          label: (tooltipItem) => `${tooltipItem.raw.toFixed(2)}%`,
        },
        bodyFont: {
          size: 16,
        },
        displayColors: false,
        backgroundColor: '#9FB3A2',
        titleColor: '#7e22ce',
        bodyColor: '#111827',
        borderWidth: 0,
        cornerRadius: 0,
        padding: 15,
        titleFont: {
          size: 18,
          weight: 'normal',
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        ticks: { color: '#1f2937' },
        grid: { color: '#ccc' },
      },
    },
  };

  return (
    <div className="w-[1000px] h-[500px] p-6">
      <Line data={data} options={options} />
    </div>
  );
}
