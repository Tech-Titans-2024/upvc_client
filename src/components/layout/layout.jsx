import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTachometerAlt, faQuoteLeft, faShoppingCart, faListAlt, faSignOutAlt, faUserAlt, faTools, faCogs, faBookmark, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.jpeg';
import './layout.css'

function Sidebar() 
{
	const menus = [
		{
			icon: faTachometerAlt,
			name: 'Dashboard',
			path: '/upvc/dashboard'
		},
		{
			icon: faQuoteLeft,
			name: 'Quotation Management',
			path: '/upvc/quotation'
		},
		{
				icon:  faPeopleGroup ,
				name: 'Sales Executive',
				path: '/upvc/salesexecutive'
			
		},
		{
			icon: faListAlt,
			name: 'Price List',
			path: '/upvc/pricelist'
		},
		{
			icon: faUserAlt,
			name: 'Customer Profile',
			path: '/upvc/customerprofile'
		},
		{
			icon: faCogs,
			name: 'Manage',
			path: '/upvc/manage'
		},
		{
			icon: faTools,
			name: 'Settings',
			path: '/upvc/settings'
		},
		{
			icon: faShoppingCart,
			name: 'Order Processing',
			path: '/upvc/order'
		},
		{
			icon: faBookmark,
			name: 'Guidelines',
			path: '/upvc/guidelines'
		},
	
		{
			icon: faSignOutAlt,
			name: 'Logout',
			path: '/'
		}
	]

	return (
        <div className="flex flex-row h-screen">
			<div className="bg-gradient-to-b from-blue-600 to-blue-700 w-[21%] p-4 flex flex-col overflow-y-auto hide-scrollbar shadow-lg gap-6 h-full">
				<div className="flex-none flex flex-col items-center">
					<img
						src={Logo}
						alt="Logo"
						className="w-full h-36 shadow-sm rounded-md shadow-white border-2 border-white"
					/>
				</div>
				<div className="flex flex-col gap-3">
					{menus.map((item, index) => (
						<NavLink
							key={index}
							to={item.path}
							className={({ isActive }) =>
								`flex items-center gap-4 text-base font-medium px-3 py-2.5 rounded-md transition-all duration-300 ${
									isActive
										? 'bg-blue-900 text-white'
										: 'hover:bg-blue-900 text-white'
								}`
							}
						>
							<FontAwesomeIcon icon={item.icon} className="text-xl w-[18px]" />
							<span>{item.name}</span>
						</NavLink>
					))}
				</div>
			</div>
            <div className="flex-1 overflow-auto p-2.5">
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar;