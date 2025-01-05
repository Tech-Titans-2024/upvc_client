import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Fixed Window', 'Sliding Window', 'Open Window'],
    datasets: [
      {
        label: 'Types of Window',
        data: [50, 30, 20], // Percentage data for the doors
        backgroundColor: [
          'rgba(0, 0, 255, 1)', // Solid navy
          'rgba(255, 215, 0, 1)', // Solid gold
          'rgba(128, 0, 128, 1)', // Solid dark purple
        ],
        hoverBackgroundColor: [
          'rgba(0, 0, 255, 1)', // Solid navy
          'rgba(255, 215, 0, 1)', // Solid gold
          'rgba(128, 0, 128, 1)', // Solid dark purple
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#000000', // Black text for legend (to match the white background)
        },
      },
      title: {
        display: true,
        text: 'Types of Window', // Chart title
        font: {
          size: 20,
          weight: 'bold',
          family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        color: '#000000', // Black title text
      },
    },
  };

  return (
    <div className="p-6 bg-white text-black rounded-lg shadow-lg h-96">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
