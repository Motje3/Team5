import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingCart, Users, FileText, Globe, BarChart2, Settings, Activity } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-indigo-950 text-white flex flex-col">
      <div className="p-6 border-b border-indigo-900">
        <h1 className="text-2xl font-bold text-yellow-200">E. Lafeber</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-4">
          <div className="px-6 py-3">
            <p className="text-gray-400 text-sm uppercase font-semibold mb-2">Dashboard</p>
            <Link to="/dashboard" className="flex items-center py-2 px-4 rounded-md bg-indigo-900 text-white hover:bg-indigo-800">
              <Home size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="px-6 py-3">
            <p className="text-gray-400 text-sm uppercase font-semibold mb-2">Client Facing</p>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-indigo-900">
                  <ShoppingCart size={20} className="mr-3" />
                  <span>Zendingen</span>
                </Link>
              </li>
              <li>
                <Link to="/customers" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-indigo-900">
                  <Users size={20} className="mr-3" />
                  <span>Statistieken</span>
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-indigo-900">
                  <FileText size={20} className="mr-3" />
                  <span>Problemen</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="px-6 py-3">
            <p className="text-gray-400 text-sm uppercase font-semibold mb-2">Management</p>
            <ul className="space-y-2">
              <li>
                <Link to="/admin" className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-indigo-900">
                  <Settings size={20} className="mr-3" />
                  <span>Accounts</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      <div className="p-4 border-t border-indigo-900 flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white mr-3">
          <span className="font-bold">T</span>
        </div>
        <div>
          <p className="font-medium">Team-5</p>
          <p className="text-xs text-gray-400">Legends</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;