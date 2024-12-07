import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTachometerAlt, faQuoteLeft, faShoppingCart, faListAlt, faSignOutAlt, faUserAlt, faTools, faCogs, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.jpeg';

function Sidebar() 
{
	const menus = [
		{
			icon: faTachometerAlt,
			name: 'Dashboard',
			path: '/layout/dashboard'
		},
		{
			icon: faQuoteLeft,
			name: 'Quotation Management',
			path: '/layout/quotation'
		},
		{
			icon: faShoppingCart,
			name: 'Order Processing',
			path: '/layout/order'
		},
		{
			icon: faListAlt,
			name: 'Price List',
			path: '/layout/pricelist'
		},
		{
			icon: faUserAlt,
			name: 'Customer Details',
			path: '/layout/customer'
		},
		{
			icon: faCogs,
			name: 'Manage',
			path: '/layout/manage'
		},
		{
			icon: faTools,
			name: 'Settings',
			path: '/layout/settings'
		},
		{
			icon: faBookmark,
			name: 'Guidelines',
			path: '/layout/guidelines'
		},
		{
			icon: faSignOutAlt,
			name: 'Logout',
			path: '/logout'
		}
	]

	return (
		<div className='flex flex-row h-screen w-screen'>
			<div className=' bg-teal-700 w-72 p-3 flex flex-col text-black'>
				<div className='flex flex-col mb-2 place-items-center'>
					<img src={Logo} alt='Logo' className='w-41 h-43' />
				</div>
				{menus.map((item, index) => (
					<NavLink
					key={index}
					to={item.path}
					className={({ isActive }) =>
						`my-1 space-x-4 text-lg px-4 py-5 flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''}`
					}
				>
					<FontAwesomeIcon icon={item.icon} className="text-white text-xl w-5" />
					<label className="text-center cursor-pointer font-medium text-white relative z-10 text-s">
						{item.name}
					</label>
				</NavLink>
				))}
			</div>
			<div className="p-4 flex-1">
				<div className="mt-4">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Sidebar;