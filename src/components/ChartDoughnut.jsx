import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { calculateMetrics } from '../utils/calculateMetrics';
import { useCrypto } from '../context/crypto-context';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDoughnut() {
  const { assets } = useCrypto();
  const metrics = calculateMetrics(assets);
  console.log(assets);

  const sectorROI = metrics.reduce((acc, asset) => {
    if (acc[asset.sector]) {
      acc[asset.sector].totalROI += asset.roi;
      acc[asset.sector].count += 1;
    } else {
      acc[asset.sector] = { totalROI: asset.roi, count: 1 };
    }
    return acc;
  }, {});

  const sectorAverageROI = Object.keys(sectorROI).map((sector) => {
    const { totalROI, count } = sectorROI[sector];
    return { sector, roi: (totalROI / count).toFixed(1) };
  });

  const data = {
    labels: sectorAverageROI.map((item) => item.sector),
    datasets: [
      {
        data: sectorAverageROI.map((item) => parseFloat(item.roi)),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.toFixed(2)} %`; // Округление значений в подсказке
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '25%',
        height: '300px',
        margin: '2rem',
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}
