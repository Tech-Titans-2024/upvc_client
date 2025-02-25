import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Layout from './components/layout/layout';
import Quotation from './components/quotation/main';
import Dashboard from './components/dashboard/dashboard';
import SalesExecutive from './components/salesexecutive/salesexecutive';
import PriceList from './components/pricelist/pricelist';
import Calculator from './components/calculator/calculator';
import Manage from './components/manage/manage';
import Order from './components/order/order';
import Reports from './components/reports/report';
import CustomerManage from './components/customer/customer';
import Profile from './components/profile/profile';

function App() 
{
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/upvc' element={<Layout />} >
					<Route path='/upvc/dashboard' element={<Dashboard />} />
					<Route path='/upvc/reports' element={<Reports />} />
					<Route path='/upvc/order' element={<Order />} />
					<Route path='/upvc/profile' element={<Profile />} />
					<Route path='/upvc/quotation' element={<Quotation />} />
					<Route path="/upvc/salesexecutive" element={<SalesExecutive />} />
					<Route path="/upvc/pricelist" element={<PriceList />} />
					<Route path="/upvc/calculator" element={<Calculator />} />
					<Route path="/upvc/manage" element={<Manage />} />
					<Route path="/upvc/customerprofile" element={<CustomerManage />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App;