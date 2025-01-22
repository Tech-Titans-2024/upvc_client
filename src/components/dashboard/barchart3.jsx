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
    labels: ['Door', 'Window', 'Louvers'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 95, 80],
        backgroundColor: [
          'rgba(0, 123, 255, 1)',  // Blue for Door
          'rgba(40, 167, 69, 1)',  // Green for Window
          'rgba(255, 193, 7, 1)',   // Yellow for Louvers
        ],
        hoverBackgroundColor: [
          'rgba(0, 123, 255, 0.8)',  // Dimmer blue
          'rgba(40, 167, 69, 0.8)',  // Dimmer green
          'rgba(255, 193, 7, 0.8)',   // Dimmer yellow
        ],
        borderRadius: 8,  // Slightly rounded corners
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',  // Subtle border for professionalism
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
        labels: {
          color: '#495057', // Darker gray for readability
          font: {
            size: 14,  // Slightly smaller font for the legend
            weight: '600',  // Semi-bold text for the legend
          },
        },
      },
      title: {
        display: true,
        text: 'Sales by Product Type',  // Added a more professional title
        font: {
          size: 22,  // Slightly smaller title size for a cleaner look
          weight: 'bold',
        },
        padding: {
          top: 20,  // Space above the title
          bottom: 20,  // Space below the title
        },
        color: '#212529',  // Dark gray for the title
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Light grid lines for clarity
          borderDash: [5, 5],  // Dashed grid lines for a more modern feel
        },
        ticks: {
          color: '#6C757D',  // Lighter gray for tick labels
          font: {
            size: 12,  // Smaller font size for ticks
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Light grid lines
          borderDash: [5, 5], // Dashed grid lines
        },
        ticks: {
          color: '#6C757D', // Lighter gray for tick labels
          font: {
            size: 12,  // Smaller font size for ticks
          },
        },
      },
    },
    animation: {
      duration: 1000, // Slightly faster animation
      easing: 'easeOutQuart', // Smoother easing for a more professional animation
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
