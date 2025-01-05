import React from 'react';
import BarChart1 from './barchart1'; // Correct import (Horizontal Bar Chart)
// import BarChart2 from './barchart2'; // Correct import (Horizontal Bar Chart)
import BarChart3 from './barchart3'; // Correct import (Vertical Bar Chart)
import BarChart4 from './barchart4'; // Correct import (Vertical Bar Chart)
import PieChart1 from './piechart1'; // Correct import (Pie Chart)
import PieChart2 from './piechart2'; // Correct import (Pie Chart)
import PieChart3 from './piechart3'; // Correct import (Pie Chart)

function Dashboard() {
  return (
    <div className="w-full h-auto p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <BarChart1 />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <BarChart3 />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Vertical Bar Chart 2</h2>
          <BarChart4 />
        </div>
      </div>
      <div className='w-full h-fit bg-white mt-4 rounded-lg shadow-lg flex justify-between'>
        <PieChart1 />
        <PieChart2 />
        <PieChart3 />


      </div>
    </div>
  );
}

export default Dashboard;
