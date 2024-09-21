import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

// Test data
const data = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Time Keeping App Pie Chart',
    },
  },
};

export default function PieChartComponent() {
  return (
    <div>
      <h2 className='roboto-medium'>Usage Statistics</h2>
      <Pie data={data} options={options} />
    </div>
  );
}
