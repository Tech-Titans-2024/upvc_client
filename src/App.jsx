import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Layout from './components/layout/layout';
import Menu from './components/menu/menu';
import Measure from './components/menu/measurement';
import Calculate from './components/menu/calculation';
// import Quotation from './components/quotation/quotation';
import Quotation from './Quotation/Main';
import Dashboard from './components/dashboard/dashboard';
import SalesExecutive from './components/salesexecutive/salesexecutive';
import Measurement from "./components/quotation/details";
import Subcategory from './components/quotation/subcategory'
import PriceList from './components/pricelist/pricelist';
import Manage from './components/manage/manage';
import CustomerManage from './components/customerManage/customer';
import Guidelines from './components/guidelines/guidelines'
function App() 
{
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/upvc' element={<Layout />} >
					<Route path='/upvc/dashboard' element={<Dashboard />} />
					<Route path='/upvc/customer' element={<Guidelines />} />
					<Route path='/upvc/settings' element={<Guidelines />} />
					<Route path='/upvc/order' element={<Guidelines />} />
					<Route path='/upvc/guidelines' element={<Guidelines />} />
					<Route path='/upvc/quotation' element={<Quotation />} />
					<Route path='/upvc/subcategory' element={<Subcategory />} />
					<Route path="/upvc/measurement" element={<Measurement />} />
					<Route path="/upvc/salesexecutive" element={<SalesExecutive />} />
					<Route path="/upvc/pricelist" element={<PriceList />} />
					<Route path="/upvc/manage" element={<Manage />} />
					<Route path="/upvc/customerprofile" element={<CustomerManage />} />
				</Route>
				<Route path='/measure' element={<Measure />} />
				<Route path='/calculate' element={<Calculate />} />

			</Routes>
		</Router>
	)
}

export default App;