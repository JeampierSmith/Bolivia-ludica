import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/common/AuthContext';
import AdminSidebar from '../../components/layout/Header/AdminSidebar';
import AdminHeader from '../../components/layout/Header/AdminHeader';
import AdminFooter from '../../components/layout/Footer/AdminFooter';
import { FaUsers, FaUserFriends, FaGamepad, FaShoppingCart } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUsuarios, getProductos, getTiendas, getPedidos } from '../../services/api';

// --- Overview Card Component ---
const OverviewCard = ({ icon, title, value }) => (
  <div className="flex items-center bg-white rounded-lg shadow p-5 w-full">
    <div className="mr-4">{icon}</div>
    <div>
      <div className="text-lg font-semibold text-gray-700">{title}</div>
      <div className="text-3xl font-bold text-black">{value}</div>
    </div>
  </div>
);

const Dashboard = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.rol !== 'admin' && user.rol !== 'superadmin') return <Navigate to="/" replace />;

  const [metrics, setMetrics] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  useEffect(() => {
    async function fetchMetrics() {
      // Obtiene datos reales de la base de datos
      const [usuarios, productos, tiendas, pedidos] = await Promise.all([
        getUsuarios(),
        getProductos(),
        getTiendas(),
        getPedidos()
      ]);
      setMetrics([
        { title: 'Usuarios', value: usuarios.length, icon: <FaUsers className="text-3xl text-blue-600" /> },
        { title: 'Clientes', value: usuarios.filter(u => u.rol === 'cliente').length, icon: <FaUserFriends className="text-3xl text-green-600" /> },
        { title: 'Jugadores', value: usuarios.filter(u => u.rol === 'jugador').length, icon: <FaGamepad className="text-3xl text-yellow-500" /> },
        { title: 'Pedidos', value: pedidos.length, icon: <FaShoppingCart className="text-3xl text-purple-600" /> },
      ]);
      // Ingreso por mes (mock: suma de totales por mes)
      const ingresosPorMes = Array(12).fill(0);
      pedidos.forEach(p => {
        if (p.fechaPedido && p.total) {
          const d = new Date(p.fechaPedido);
          if (!isNaN(d)) ingresosPorMes[d.getMonth()] += p.total;
        }
      });
      setIncomeData([
        { month: 'Ene', amount: ingresosPorMes[0] },
        { month: 'Feb', amount: ingresosPorMes[1] },
        { month: 'Mar', amount: ingresosPorMes[2] },
        { month: 'Abr', amount: ingresosPorMes[3] },
        { month: 'May', amount: ingresosPorMes[4] },
        { month: 'Jun', amount: ingresosPorMes[5] },
        { month: 'Jul', amount: ingresosPorMes[6] },
        { month: 'Ago', amount: ingresosPorMes[7] },
        { month: 'Sep', amount: ingresosPorMes[8] },
        { month: 'Oct', amount: ingresosPorMes[9] },
        { month: 'Nov', amount: ingresosPorMes[10] },
        { month: 'Dic', amount: ingresosPorMes[11] },
      ]);
      // Pedidos confirmados por día (solo estado 'confirmado')
      const pedidosConfirmados = pedidos.filter(p => p.estado === 'confirmado' && p.fechaPedido);
      const pedidosPorDia = {};
      pedidosConfirmados.forEach(p => {
        const d = new Date(p.fechaPedido);
        if (!isNaN(d)) {
          const key = d.toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit' });
          pedidosPorDia[key] = (pedidosPorDia[key] || 0) + 1;
        }
      });
      setOrdersData(Object.entries(pedidosPorDia).map(([date, count]) => ({ date, count })));
    }
    fetchMetrics();
  }, [year]);

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-h-screen md:ml-60 bg-white">
        <AdminHeader />
        <main className="flex-1 bg-white text-black p-6">
          {children ? (
            children
          ) : (
            <>
              {/* Overview Cards */}
              <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                  <OverviewCard key={i} icon={m.icon} title={m.title} value={m.value} />
                ))}
              </section>

              {/* Charts Section */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ingreso por Mes */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Ingreso por Mes</h3>
                    <select
                      className="border rounded px-2 py-1"
                      value={year}
                      onChange={e => setYear(Number(e.target.value))}
                    >
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={incomeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="amount" fill="#3b82f6" name="Ingreso" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pedidos Confirmados */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Pedidos Confirmados por Día</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ordersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#10b981" name="Confirmados" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          )}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default Dashboard;