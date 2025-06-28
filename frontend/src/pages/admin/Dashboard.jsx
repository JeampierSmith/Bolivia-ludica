import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/common/AuthContext';
import AdminSidebar from '../../components/layout/Header/AdminSidebar';
import AdminHeader from '../../components/layout/Header/AdminHeader';
import AdminFooter from '../../components/layout/Footer/AdminFooter';

const Dashboard = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.rol !== 'admin' && user.rol !== 'superadmin') return <Navigate to="/" replace />;
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-h-screen md:ml-60 bg-white">
        <AdminHeader />
        <main className="flex-1 bg-white text-black">
          {children || <h2 className="text-2xl font-bold">Bienvenido al panel de administración</h2>}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default Dashboard;