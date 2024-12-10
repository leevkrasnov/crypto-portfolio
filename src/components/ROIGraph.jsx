import { useCrypto } from '../context/crypto-context';
import { calculateMetrics } from '../utils/calculateMetrics';
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
  const metrics = calculateMetrics(assets);

  const data = {
    labels: metrics.map((asset) => asset.coin.name),
    datasets: [
      {
        label: 'ROI (%)',
        data: metrics.map((asset) => asset.roi),
        borderWidth: 1.2,
        pointRadius: 3,
        pointBackgroundColor: '#d1d5db',
        hoverRadius: 8,
        hoverBackgroundColor: '#9FB3A2',
        borderColor: '#6b7280',
        tension: 0.3,
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
            // Показываем название актива
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
    <div className="w-[1100px] h-[500px] p-6">
      <Line data={data} options={options} />
    </div>
  );
}
