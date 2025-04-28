import React from 'react';
import { Search, Moon, Settings, Download } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="h-16 bg-indigo-950 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-indigo-900 text-white pl-10 pr-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-700"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white">
          <Moon size={20} />
        </button>
        <button className="text-gray-300 hover:text-white">
          <Settings size={20} />
        </button>
        <button className="bg-yellow-200 text-indigo-950 px-4 py-2 rounded flex items-center font-medium">
          <Download size={18} className="mr-2" />
          DOWNLOAD REPORTS
        </button>
        <div className="flex items-center ml-4">
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
            <span className="font-bold">S</span>
          </div>
          <div className="ml-2">
            <p className="text-white text-sm">Shelly</p>
            <p className="text-gray-400 text-xs">Pharmacist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;