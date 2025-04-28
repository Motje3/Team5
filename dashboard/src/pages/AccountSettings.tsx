import React from 'react';
import { Save, User, Lock, Bell, Shield } from 'lucide-react';

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="bg-indigo-900 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <User size={24} className="text-yellow-200 mr-3" />
          <h2 className="text-xl font-semibold text-white">Personal Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
              defaultValue="Team 5" 
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
              defaultValue="team5@lafeber.com" 
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Role</label>
            <input 
              type="text" 
              className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
              defaultValue="Legends" 
              readOnly 
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Contact Number</label>
            <input 
              type="tel" 
              className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
              defaultValue="+31 6 12345678" 
            />
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Lock size={24} className="text-yellow-200 mr-3" />
          <h2 className="text-xl font-semibold text-white">Security</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Current Password</label>
            <input 
              type="password" 
              className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
              placeholder="••••••••" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">New Password</label>
              <input 
                type="password" 
                className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
                placeholder="••••••••" 
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full bg-indigo-800 border border-indigo-700 rounded p-2 text-white"
                placeholder="••••••••" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Bell size={24} className="text-yellow-200 mr-3" />
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input type="checkbox" id="email-notifications" className="mr-3" defaultChecked />
            <label htmlFor="email-notifications" className="text-gray-300">Email Notifications</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="push-notifications" className="mr-3" defaultChecked />
            <label htmlFor="push-notifications" className="text-gray-300">Push Notifications</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="monthly-report" className="mr-3" defaultChecked />
            <label htmlFor="monthly-report" className="text-gray-300">Monthly Report</label>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Shield size={24} className="text-yellow-200 mr-3" />
          <h2 className="text-xl font-semibold text-white">Privacy</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input type="checkbox" id="data-collection" className="mr-3" defaultChecked />
            <label htmlFor="data-collection" className="text-gray-300">Allow Data Collection</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="share-analytics" className="mr-3" defaultChecked />
            <label htmlFor="share-analytics" className="text-gray-300">Share Analytics with Team</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-yellow-200 text-indigo-950 px-6 py-3 rounded flex items-center font-medium">
          <Save size={18} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;