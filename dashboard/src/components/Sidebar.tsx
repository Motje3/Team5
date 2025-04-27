import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/shipments" className="hover:text-gray-300">Zendingen</Link>
        <Link to="/issues" className="hover:text-gray-300">Problemen</Link>
        <Link to="/accounts" className="hover:text-gray-300">Accounts</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
