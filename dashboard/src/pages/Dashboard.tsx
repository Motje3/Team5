import React from 'react';
import { Mail, Phone, Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white">DASHBOARD</h1>
        <p className="text-gray-400">Welcome to your dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Customers Card */}
        <div className="bg-indigo-900 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-300 mb-2">Total Customers</p>
              <h2 className="text-3xl font-bold text-white">5251</h2>
              <p className="text-green-400 mt-2">+14%</p>
            </div>
            <div className="p-2 bg-indigo-800 rounded-md">
              <Mail className="text-yellow-200" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">Since last month</p>
        </div>

        {/* Sales Today Card */}
        <div className="bg-indigo-900 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-300 mb-2">Sales Today</p>
              <h2 className="text-3xl font-bold text-white">7916</h2>
              <p className="text-green-400 mt-2">+21%</p>
            </div>
            <div className="p-2 bg-indigo-800 rounded-md">
              <Phone className="text-yellow-200" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">Since last month</p>
        </div>

        {/* Monthly Sales Card */}
        <div className="bg-indigo-900 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-300 mb-2">Monthly Sales</p>
              <h2 className="text-3xl font-bold text-white">59525</h2>
              <p className="text-green-400 mt-2">+5%</p>
            </div>
            <div className="p-2 bg-indigo-800 rounded-md">
              <Users className="text-yellow-200" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">Since last month</p>
        </div>

        {/* Yearly Sales Card */}
        <div className="bg-indigo-900 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-300 mb-2">Yearly Sales</p>
              <h2 className="text-3xl font-bold text-white">65152</h2>
              <p className="text-green-400 mt-2">+43%</p>
            </div>
            <div className="p-2 bg-indigo-800 rounded-md">
              <DollarSign className="text-yellow-200" size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">Since last month</p>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="bg-indigo-900 rounded-lg p-6 h-80 relative">
        <h3 className="text-white font-semibold mb-4">Sales Trends</h3>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400">Chart will be implemented here</p>
        </div>
      </div>

      {/* Table placeholder */}
      <div className="bg-indigo-900 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-indigo-800">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">User ID</th>
              <th className="py-3 px-4">CreatedAt</th>
              <th className="py-3 px-4"># of Products</th>
              <th className="py-3 px-4">Cost</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="border-b border-indigo-800">
                <td className="py-3 px-4">637010f74f03239c72c0001b{row}</td>
                <td className="py-3 px-4">637010cf103233{row}c0000124</td>
                <td className="py-3 px-4">2022-11-29T01:09:39.558Z</td>
                <td className="py-3 px-4">{row}</td>
                <td className="py-3 px-4">${(row * 500 + 123.45).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 text-gray-400">
          <div>Rows per page: 10</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-indigo-800 rounded">Previous</button>
            <button className="px-3 py-1 border border-indigo-800 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;