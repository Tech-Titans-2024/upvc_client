import React from "react";
import { FaTachometerAlt, FaQuoteLeft, FaShoppingCart, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import Logo from '../assets/logo.jpg'

const sidebar = () => {
  return (
    <div className="bg-teal-600 text-white h-screen px-4 fixed w-16 md:w-64 border-r border-teal-700">
     <img src={Logo} alt="Logo" className="rounded-half w-50 h-50 mx-auto mt-7" />
      <ul className="flex flex-col mt-5 text-xl">
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
          <FaTachometerAlt />
          <span className="hidden md:inline">Dashboad</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <FaQuoteLeft /> 
        <span className="hidden md:inline">Quotation</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <FaShoppingCart />
          <span className="hidden md:inline">Ordering</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <FaFileAlt /> 
          <span className="hidden md:inline">Reports</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
          <FaTachometerAlt />
          <span className="hidden md:inline">Mangae</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
          <FaTachometerAlt />
          <span className="hidden md:inline">Setting</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
          <FaTachometerAlt />
          <span className="hidden md:inline">Guidelines</span>
        </li>
        <li className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <FaSignOutAlt /> 
          <span className="hidden md:inline">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default sidebar;
