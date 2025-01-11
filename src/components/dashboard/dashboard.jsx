import React from 'react';
import BarChart1 from './barchart1'; // Correct import (Horizontal Bar Chart)
import BarChart3 from './barchart3'; // Correct import (Vertical Bar Chart)
import BarChart4 from './barchart4'; // Correct import (Vertical Bar Chart)
import PieChart1 from './piechart1'; // Correct import (Pie Chart)
import PieChart2 from './piechart2'; // Correct import (Pie Chart)
import PieChart3 from './piechart3'; // Correct import (Pie Chart)

function Dashboard() {
  return (
    <div className="w-full h-auto p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <BarChart1 />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <BarChart3 />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <BarChart4 />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PieChart1 />
          <PieChart2 />
          <PieChart3 />
      </div>
    </div>
  );
}

export default Dashboard;