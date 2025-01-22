import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const BarChart = () => 
{
    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ],
        datasets: [
            {
                label: 'Target Sales',
                data: [15, 20, 10, 12, 18, 15, 25, 20, 22, 24, 23, 25],
                backgroundColor: 'rgba(75, 240, 192, 0.7)', // Light Green for Target
                borderColor: 'rgba(75, 192, 192, 1)', // Solid green
                borderWidth: 1,
            },
            {
                label: 'Actual Sales',
                data: [12, 19, 8, 10, 16, 12, 22, 18, 20, 23, 21, 23],
                backgroundColor: 'rgba(153, 110, 255, 0.7)', // Purple for Actual
                borderColor: 'rgba(153, 102, 255, 1)', // Solid purple
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
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Target vs Actual Sales Data (12 Months)',
                font: {
                    size: 18,
                },
                padding: {
                    top: 10,
                    bottom: 20,
                },
            },
            tooltip: {
                backgroundColor: '#000',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
            },
        },
        scales: {
            x: {
                stacked: false,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    borderDash: [5, 5],
                },
                title: {
                    display: true,
                    text: 'Sales Count',
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    }

    return (
        <div className="h-96 w-full p-4 rounded-lg shadow-lg bg-white">
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart;