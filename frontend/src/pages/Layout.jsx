import React from 'react';
import Sidebar from '../components/common/Sidebar';

const Layout = ({ children }) => (
  <div className="flex bg-gray-50 min-h-screen">
    <Sidebar />
    <main className="ml-64 flex-1 p-8 overflow-auto">
      {children}
    </main>
  </div>
);

export default Layout;
