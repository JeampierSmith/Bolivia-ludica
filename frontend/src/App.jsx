import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Hero from "./components/features/Hero.jsx";
import FeaturedGames from "./components/features/games/FeaturedGames.jsx";
import StoresSection from "./components/features/stores/StoresSection.jsx";
import PasaporteLudico from "./components/features/pasaporte/PasaporteLudico.jsx";
import Unete from "./components/features/pasaporte/Unete.jsx";
import Comunidad from "./pages/Comunidad.jsx";
import BoliviaPlay from "./pages/BoliviaPlay.jsx";
import Ranking from "./pages/Ranking.jsx";
import RankingAdmin from './pages/admin/Ranking.jsx';
import ComunidadTienda from "./pages/ComunidadTienda.jsx";
import Tienda from "./pages/tienda/Tienda.jsx";
import Login from "./pages/tienda/Login.jsx";
import ProductoDetalle from './pages/tienda/ProductoDetalle.jsx';
import { AuthProvider } from './components/common/AuthContext.jsx';
import { CartProvider } from './components/common/CartContext.jsx';
import Perfil from './pages/tienda/Perfil.jsx';
import Carrito from './pages/tienda/Carrito.jsx';
import Confirmacion from './pages/tienda/Confirmacion.jsx';
import Dashboard from "./pages/admin/Dashboard.jsx";
import Usuarios from "./pages/admin/Usuarios.jsx";
import Productos from "./pages/admin/Productos.jsx";
import Pedidos from "./pages/admin/Pedidos.jsx";
import Tiendas from "./pages/admin/Tiendas.jsx";
import Clientes from "./pages/admin/Clientes.jsx";
import PrivateRoute from './routes/PrivateRoutes';
import AdminLogin from './pages/admin/login.jsx';
import PerfilAdmin from './pages/admin/perfilAdmin.jsx';


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/productos')
      .then(res => res.ok ? setApiStatus('ok') : setApiStatus('error'))
      .catch(() => setApiStatus('error'));
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div>
          {!isAdminRoute && <Header />}
          {apiStatus === 'error' && (
            <div className="bg-red-100 text-red-700 p-2 text-center font-bold">No se pudo conectar con el backend</div>
          )}
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <StoresSection />
                <PasaporteLudico />
                <FeaturedGames />
              </>
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/usuarios" element={
              <PrivateRoute>
                <Dashboard><Usuarios /></Dashboard>
              </PrivateRoute>
            } />
            <Route path="/admin/clientes" element={
              <PrivateRoute>
                <Dashboard><Clientes /></Dashboard>
              </PrivateRoute>
            } />
            <Route path="/admin/productos" element={
              <PrivateRoute>
                <Dashboard><Productos /></Dashboard>
              </PrivateRoute>
            } />
            <Route path="/admin/pedidos" element={
              <PrivateRoute>
                <Dashboard><Pedidos /></Dashboard>
              </PrivateRoute>
            } />
            <Route path="/admin/tiendas" element={
              <PrivateRoute>
                <Dashboard><Tiendas /></Dashboard>
              </PrivateRoute>
            } />
            <Route path="/admin/ranking" element={
              <PrivateRoute>
                <Dashboard><RankingAdmin /></Dashboard>
              </PrivateRoute>
            } />
            <Route path="/admin/perfil" element={
              <PrivateRoute>
                <Dashboard><PerfilAdmin /></Dashboard>
              </PrivateRoute>
            } />
            <Route path="/unete" element={<Unete />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/comunidad/:tiendaSlug" element={<ComunidadTienda />} />
            <Route path="/boliviaplay" element={<BoliviaPlay />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/:productoSlug" element={<ProductoDetalle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
          </Routes>
          {!isAdminRoute && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;