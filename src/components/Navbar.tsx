import React from 'react';
import { Bell, RefreshCw } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm h-16 flex items-center px-6">
      <div className="flex-1">
        <input
          type="search"
          placeholder="Search..."
          className="w-96 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <RefreshCw size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </nav>
  );
};

export default Navbar;