import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faQuoteLeft,
  faShoppingCart,
  faListAlt,
  faSignOutAlt,
  faUserAlt,
  faTools,
  faCogs,
  faBookmark,
  faPeopleGroup,
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.jpeg';
import './layout.css';

function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  const menus = [
    {
      icon: faTachometerAlt,
      name: 'Dashboard',
      path: '/upvc/dashboard',
    },
    {
      icon: faQuoteLeft,
      name: 'Quotation Management',
      path: '/upvc/quotation',
    },
    {
      icon: faPeopleGroup,
      name: 'Manage',
      path: '',
      children: [
        { name: 'Price List', path: '/upvc/manage/pricelist' },
        { name: 'Staff Manage', path: '/upvc/manage/staff' },
        { name: 'Customer Manage', path: '/upvc/manage/customer' },
      ],
    },
    {
      icon: faListAlt,
      name: 'Price List',
      path: '/upvc/pricelist',
    },
    {
      icon: faUserAlt,
      name: 'Customer Details',
      path: '/upvc/customer',
    },
    {
      icon: faCogs,
      name: 'Settings',
      path: '/upvc/settings',
    },
    {
      icon: faShoppingCart,
      name: 'Order Processing',
      path: '/upvc/order',
    },
    {
      icon: faBookmark,
      name: 'Guidelines',
      path: '/upvc/guidelines',
    },
    {
      icon: faSignOutAlt,
      name: 'Logout',
      path: '/',
    },
  ];

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
            <div key={index} className="flex flex-col">
              {!item.children ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 text-base font-medium px-3 py-2.5 rounded-md transition-all duration-300 ${
                      isActive ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 text-white'
                    }`
                  }
                >
                  <FontAwesomeIcon icon={item.icon} className="text-xl w-[18px]" />
                  <span>{item.name}</span>
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center justify-between gap-4 text-base font-medium px-3 py-2.5 rounded-md transition-all duration-300 text-white hover:bg-blue-900"
                  >
                    <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={item.icon} className="text-xl w-[18px]" />
                      <span>{item.name}</span>
                    </div>
                    <FontAwesomeIcon
                      icon={openMenus[item.name] ? faChevronDown : faChevronRight}
                    />
                  </button>
                  {openMenus[item.name] && (
                    <div className="flex flex-col pl-10 gap-2">
                      {item.children.map((child, childIndex) => (
                        <NavLink
                          key={childIndex}
                          to={child.path}
                          className={({ isActive }) =>
                            `text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-300 ${
                              isActive ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 text-white'
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2.5">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
