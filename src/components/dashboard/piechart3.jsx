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
    labels: ['Louvers with Fan', 'Louvers without Fan'], // Labels for the two parts
    datasets: [
      {
        label: 'Louvers',
        data: [60, 40], // Percentage data for Louvers with and without Fan
        backgroundColor: [
          '#FF6384', // Vibrant pink
          '#36A2EB', // Vibrant blue
          '#FFCE56', // Vibrant yellow
        ],
        hoverBackgroundColor: [
          '#FF6384', // Vibrant pink
          '#36A2EB', // Vibrant blue
          '#FFCE56', // Vibrant yellow
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
        text: 'Louvers', // Chart title
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
