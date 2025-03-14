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

const HorizontalBarChart = () => {
  const data = {
    labels: ['Door', 'Window', 'Louvers',],
    datasets: [
      {
        label: 'Sales',
        data: [65, 95, 80],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Solid colors
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)', // Brighter on hover
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#6B7280', // Tailwind gray-600
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: '#6B7280', // Tailwind gray-600
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
