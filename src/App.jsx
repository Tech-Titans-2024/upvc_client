import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Layout from './components/layout/layout';
import Menu from './components/menu/menu';
import Measure from './components/menu/measurement';
import Calculate from './components/menu/calculation';
import Quotation from './components/quotation/quotation';
import Dashboard from './components/dashboard/dashboard';

function App() 
{
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/upvc' element={<Layout />} >
					<Route path='/upvc/dashboard' element={<Dashboard />} />
					<Route path='/upvc/pricelist' element={<Dashboard />} />
					<Route path='/upvc/customer' element={<Dashboard />} />
					<Route path='/upvc/manage' element={<Dashboard />} />
					<Route path='/upvc/settings' element={<Dashboard />} />
					<Route path='/upvc/order' element={<Dashboard />} />
					<Route path='/upvc/guidelines' element={<Dashboard />} />
					<Route path='/upvc/quotation' element={<Quotation />} />
				</Route>
				<Route path='/measure' element={<Measure />} />
				<Route path='/calculate' element={<Calculate />} />
			</Routes>
		</Router>
	)
}

export default App;