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
import Annotation from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Annotation
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
        borderRadius: 8,
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
        display: false,
        text: 'ROI по активам',
        font: {
          size: 24,
        },
        color: '#292929',
        padding: {
          bottom: 30,
        },
      },
      annotation: {
        annotations: {
          line0: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: 'grey',
            borderWidth: 0.5,
            label: {
              enabled: false,
              content: 'Y = 0',
              position: 'start',
              font: {
                size: 12,
              },
            },
          },
        },
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
          display: false,
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
        width: '65%',
        height: '400px',
        marginTop: '4rem',
        marginLeft: '1rem',
      }}
    >
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
