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
			path: '/upvc/dashboard'
		},
		{
			icon: faQuoteLeft,
			name: 'Quotation Management',
			path: '/upvc/quotation'
		},
		{
			icon: faListAlt,
			name: 'Price List',
			path: '/upvc/pricelist'
		},
		{
			icon: faUserAlt,
			name: 'Customer Details',
			path: '/upvc/customer'
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
        <div className="flex flex-row min-h-screen bg-gray-100">
            <div className="bg-blue-600 w-[22%] p-4 flex flex-col justify-between shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-full h-36 shadow-sm rounded-md shadow-black border-2 border-white"
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
                                        ? 'bg-white text-blue-800 shadow-md'
                                        : 'text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400'
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={item.icon} className="text-xl w-[18px]" />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="flex-1 p-2.5 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar;