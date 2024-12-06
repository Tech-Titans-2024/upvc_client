import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaQuoteLeft, FaShoppingCart, FaListAlt, 
  FaSignOutAlt, FaUserAlt, FaTools, FaCogs, FaRegBookmark 
} from "react-icons/fa";
import Logo from '../../assets/logo.jpeg';


const menus = [
  {
    icon: FaTachometerAlt,
    name: 'Dashboard',
    path: 'dashboard'
  },
  {
    icon: FaQuoteLeft,
    name: 'Quotation Management',
    path: '/sidebar/quotation-management'
  },
  {
    icon: FaShoppingCart,
    name: 'Order Processing',
    path: '/order-processing'
  },
  {
    icon: FaListAlt,
    name: 'Price List',
    path: '/price-list'
  },
  {
    icon: FaUserAlt,
    name: 'Customer Details',
    path: '/customer-details'
  },
  {
    icon: FaCogs,
    name: 'Manage',
    path: '/manage'
  },
  {
    icon: FaTools,
    name: 'Settings',
    path: '/settings'
  },
  {
    icon: FaRegBookmark,
    name: 'Guidelines',
    path: '/guidelines'
  },
  {
    icon: FaSignOutAlt,
    name: 'Logout',
    path: '/logout'
  }
];


const Sidebar = () => {
    
  return (
    <div className='flex flex-row h-screen w-screen'>
      <div className=' bg-teal-600 w-64 p-3 flex flex-col text-black'>
        <div className='flex flex-col mt- mb-5 place-items-center'>
          <img src={Logo} alt='Logo' className='w-43 h-43' />
        </div>
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''}`
            }
          >
            {React.createElement(item.icon, { className: 'text-white text-2xl' })}
            <label className="text-center cursor-pointer font-medium text-base text-white relative z-10">
              {item.name}
            </label>
          </NavLink>
        ))}
        {/* <button
          onClick={handleLogout}
          className="space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50"
        >
          <TiPower className="text-white text-2xl " />
          <label className="text-center cursor-pointer font-medium text-base text-white relative z-10">
            Logout
          </label>
        </button> */}
      </div>
      <div className="p-4 flex-1 overflow-auto overflow-scroll">
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
