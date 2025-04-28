import React, { useState } from 'react';
import { Search, Edit, Trash, User, Mail, Phone, Shield, Plus } from 'lucide-react';

// Sample account data
const initialAccounts = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@ecomvision.com', 
    phone: '+31 6 12345678', 
    role: 'Admin',
    active: true,
    lastLogin: '2025-04-22T14:30:00'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@ecomvision.com', 
    phone: '+31 6 23456789', 
    role: 'Manager',
    active: true,
    lastLogin: '2025-04-25T09:15:00'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert@ecomvision.com', 
    phone: '+31 6 34567890', 
    role: 'Analyst',
    active: true,
    lastLogin: '2025-04-26T16:45:00'
  },
  { 
    id: 4, 
    name: 'Emily Wilson', 
    email: 'emily@ecomvision.com', 
    phone: '+31 6 45678901', 
    role: 'Support',
    active: false,
    lastLogin: '2025-04-15T11:20:00'
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    email: 'michael@ecomvision.com', 
    phone: '+31 6 56789012', 
    role: 'Developer',
    active: true,
    lastLogin: '2025-04-27T13:10:00'
  },
];

const Accounts = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    setSelectedAccount(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedAccount(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAccount) {
      setAccounts(accounts.filter(account => account.id !== selectedAccount));
      setIsDeleteModalOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Accounts</h1>
          <p className="text-gray-400">Manage user accounts</p>
        </div>
        <button 
          className="bg-yellow-200 text-indigo-950 px-4 py-2 rounded flex items-center font-medium"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add New Account
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-indigo-900 rounded-lg p-4 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search accounts..."
            className="w-full bg-indigo-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="ml-4">
          <select className="bg-indigo-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
            <option value="support">Support</option>
            <option value="developer">Developer</option>
          </select>
        </div>
        <div className="ml-4">
          <select className="bg-indigo-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Accounts table */}
      <div className="bg-indigo-900 rounded-lg p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-indigo-800">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Last Login</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="border-b border-indigo-800">
                <td className="py-3 px-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white mr-3">
                    <User size={16} />
                  </div>
                  {account.name}
                </td>
                <td className="py-3 px-4">{account.email}</td>
                <td className="py-3 px-4">{account.phone}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    account.role === 'Admin' ? 'bg-purple-600 text-purple-100' :
                    account.role === 'Manager' ? 'bg-blue-600 text-blue-100' :
                    account.role === 'Analyst' ? 'bg-green-600 text-green-100' :
                    account.role === 'Support' ? 'bg-orange-600 text-orange-100' :
                    'bg-indigo-600 text-indigo-100'
                  }`}>
                    {account.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    account.active ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                  }`}>
                    {account.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4">{formatDate(account.lastLogin)}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button 
                      className="p-1 text-blue-400 hover:text-blue-300"
                      onClick={() => handleEdit(account.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="p-1 text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(account.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAccounts.length === 0 && (
          <div className="text-center text-gray-400 py-4">
            No accounts found matching your search criteria.
          </div>
        )}
        <div className="flex justify-between items-center mt-4 text-gray-400">
          <div>Showing {filteredAccounts.length} of {accounts.length} accounts</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-indigo-800 rounded">Previous</button>
            <button className="px-3 py-1 border border-indigo-800 rounded bg-indigo-800">1</button>
            <button className="px-3 py-1 border border-indigo-800 rounded">Next</button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-indigo-900 rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 border border-gray-500 rounded text-gray-300"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 rounded text-white"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Account Modal - simplified for demo */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-indigo-900 rounded-lg p-6 w-[500px]">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Account</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white" 
                  defaultValue={accounts.find(a => a.id === selectedAccount)?.name}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
                  defaultValue={accounts.find(a => a.id === selectedAccount)?.email}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
                  defaultValue={accounts.find(a => a.id === selectedAccount)?.phone}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Role</label>
                <select className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white">
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Support">Support</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="activeStatus" 
                  className="mr-2"
                  defaultChecked={accounts.find(a => a.id === selectedAccount)?.active}
                />
                <label htmlFor="activeStatus" className="text-gray-300">Active Account</label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 border border-gray-500 rounded text-gray-300"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 rounded text-white"
                onClick={() => setIsEditModalOpen(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Account Modal - simplified for demo */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-indigo-900 rounded-lg p-6 w-[500px]">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Account</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white" 
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Phone</label>
                <input 
                  type="tel" 
                  className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Role</label>
                <select className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white">
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Support">Support</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="newActiveStatus" 
                  className="mr-2"
                  defaultChecked={true}
                />
                <label htmlFor="newActiveStatus" className="text-gray-300">Active Account</label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 border border-gray-500 rounded text-gray-300"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-600 rounded text-white"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;