import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-indigo-950">
      <Sidebar />
      <Topbar />
      <main className="ml-64 pt-16 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;