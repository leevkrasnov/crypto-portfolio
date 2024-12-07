import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { calculateMetrics } from '../utils/calculateMetrics';
import { useCrypto } from '../context/crypto-context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartRoi() {
  const { assets } = useCrypto();
  const metrics = calculateMetrics(assets);

  const chartData = {
    labels: metrics.map((asset) => asset.coin.name),
    datasets: [
      {
        label: 'ROI (%)',
        data: metrics.map((asset) => asset.roi), // Значения ROI
        backgroundColor: metrics.map((asset) =>
          asset.roi >= 0 ? '#6F58FF' : '#FFB740'
        ),
        borderRadius: 16,
        borderColor: metrics.map((asset) =>
          asset.roi >= 0 ? '#6F58FF' : '#FFB740'
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.toFixed(2)} %`;
          },
        },
      },
      title: {
        display: true,
        text: 'ROI по активам',
        font: {
          size: 24,
        },
        color: '#292929',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
          text: 'Активы',
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
        title: {
          display: false,
          text: 'ROI (%)',
        },
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '2rem auto',
      }}
    >
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
