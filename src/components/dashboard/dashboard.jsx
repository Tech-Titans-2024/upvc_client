import React from 'react';
import BarChart1 from './barchart1'; // Correct import (Horizontal Bar Chart)
import BarChart2 from './barchart2'; // Correct import (Horizontal Bar Chart)
import BarChart3 from './barchart3'; // Correct import (Vertical Bar Chart)
import BarChart4 from './barchart4'; // Correct import (Vertical Bar Chart)

function Dashboard() {
  return (
    <div className="w-full h-full p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

      {/* Top Row: Horizontal Bar Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Horizontal Bar Chart 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Horizontal Bar Chart 1</h2> */}
          <BarChart1 />
        </div>

        {/* Horizontal Bar Chart 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Horizontal Bar Chart 2</h2> */}
          <BarChart2 />
        </div>
      </div>

      {/* Bottom Row: Vertical Bar Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vertical Bar Chart 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Vertical Bar Chart 1</h2> */}
          <BarChart3 />
        </div>

        {/* Vertical Bar Chart 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Vertical Bar Chart 2</h2> */}
          <BarChart4 />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
