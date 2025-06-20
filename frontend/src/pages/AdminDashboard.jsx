import React from 'react';
import AdminSidebar from '../components/layout/Header/AdminSidebar';
import AdminHeader from '../components/layout/Header/AdminHeader';
import AdminFooter from '../components/layout/Footer/AdminFooter';

const AdminDashboard = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-h-screen ml-56 bg-white">
        <AdminHeader />
        <main className="flex-1 p-8 bg-white text-black">
          {children || <h2 className="text-2xl font-bold">Bienvenido al panel de administración</h2>}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;
