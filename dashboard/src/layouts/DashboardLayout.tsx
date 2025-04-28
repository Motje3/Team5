import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { tokens } from '../theme';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the custom background color
  const bgColor = tokens.custom.background;

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <Sidebar isOpen={isSidebarOpen} />
      <Topbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main 
        className={`pt-16 p-6 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;