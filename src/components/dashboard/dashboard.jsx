import React from 'react';
import BarChart1 from './barchart1'; 
import BarChart3 from './barchart3';
import BarChart4 from './barchart4'; 
import PieChart1 from './piechart1'; 
import PieChart2 from './piechart2'; 
import PieChart3 from './piechart3'; 

function Dashboard() 
{
	return (
		<div className="w-full h-auto px-6 pt-6 pb-1 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
			<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
			<div className="mb-6">
				<div className="bg-white p-6 rounded-lg shadow-lg transition-transform transforM">
					<BarChart1 />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
					<BarChart3 />
				</div>
				<div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
					<BarChart4 />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<PieChart1 />
				<PieChart3 />
				<PieChart2 />
			</div>
		</div>
	);
}

export default Dashboard;