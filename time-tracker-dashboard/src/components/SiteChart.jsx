import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SiteChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [100, 200, 150, 300, 250, 400, 350],
        fill: false,
        borderColor: '#4F46E5', // Indigo-600 Tailwind color
        backgroundColor: '#4F46E5',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'User Activity Over the Week' },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default SiteChart;
