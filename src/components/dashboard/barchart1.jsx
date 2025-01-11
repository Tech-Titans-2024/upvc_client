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
        label: 'Target Sales',
        data: [15, 20, 10, 12, 18, 15, 25, 20, 22, 24, 23, 25], // Target values for each month
        backgroundColor: 'rgba(54, 162, 235, 1)', // Medium blue
        borderColor: 'rgba(54, 162, 235, 1)', // Border for the target bars
        borderWidth: 1,
      },
      {
        label: 'Actual Sales',
        data: [12, 19, 8, 10, 16, 12, 22, 18, 20, 23, 21, 23], // Actual sales for each month
        backgroundColor: 'rgba(255, 159, 64, 1)', // Medium orange
        borderColor: 'rgba(255, 159, 64, 1)', // Border for the actual sales bars
        borderWidth: 1,
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
        text: 'Target vs Actual Sales Data (12 Months)',
      },
    },
    scales: {
      x: {
        stacked: false, // Bars are not stacked
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales Count',
        },
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
