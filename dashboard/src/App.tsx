// App.tsx or your main router file
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../src/layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts'; // Import the Accounts page
import AccountSettings from './pages/AccountSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Routes with DashboardLayout */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
        
        {/* Accounts Route - Add this route */}
        <Route path="/accounts" element={
          <DashboardLayout>
            <Accounts />
          </DashboardLayout>
        } />
        
        {/* Account Settings Route */}
        <Route path="/account-settings" element={
          <DashboardLayout>
            <AccountSettings />
          </DashboardLayout>
        } />
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;