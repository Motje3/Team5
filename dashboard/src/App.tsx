import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } 
        />
        {/* Add more routes for other pages as needed */}
        <Route 
          path="*" 
          element={
            <DashboardLayout>
              <div className="flex justify-center items-center h-96">
                <h1 className="text-2xl text-white">Page not found</h1>
              </div>
            </DashboardLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;