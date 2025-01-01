import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 8, 6, 4, 7, 9, 10], // 12 data points
        backgroundColor: [
          'rgba(255, 99, 132, 1)', // Solid red
          'rgba(54, 162, 235, 1)', // Solid blue
          'rgba(255, 206, 86, 1)', // Solid yellow
          'rgba(75, 192, 192, 1)', // Solid teal
          'rgba(153, 102, 255, 1)', // Solid purple
          'rgba(255, 159, 64, 1)', // Solid orange
          'rgba(255, 0, 0, 1)', // Solid dark red
          'rgba(0, 128, 0, 1)', // Solid green
          'rgba(0, 0, 255, 1)', // Solid navy
          'rgba(255, 215, 0, 1)', // Solid gold
          'rgba(128, 0, 128, 1)', // Solid dark purple
          'rgba(0, 255, 255, 1)', // Solid cyan
        ],
        borderWidth: 0, // Remove borders for solid look
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Data (12 Months, Solid Colors)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-96 w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
