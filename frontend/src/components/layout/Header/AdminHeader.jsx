import React from 'react';

const AdminHeader = () => (
  <header className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-10">
    <div className="font-extrabold text-2xl tracking-wide flex items-center gap-2">
      <span className="hidden sm:inline">Panel de Administración</span>
      <span className="inline sm:hidden">Admin</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="mr-1 text-sm font-semibold hidden sm:inline">admin</span>
      <span className="bg-gradient-to-br from-white to-gray-200 text-black rounded-full w-10 h-10 flex items-center justify-center font-extrabold text-lg border-2 border-white shadow-md">
        A
      </span>
    </div>
  </header>
);

export default AdminHeader;
