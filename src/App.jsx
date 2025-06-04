import React from "react";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Hero from "./components/features/Hero";
import FeaturedGames from "./components/features/games/FeaturedGames";
import StoresSection from "./components/features/stores/StoresSection";
import PasaporteLudico from "./components/features/pasaporte/PasaporteLudico";
import Unete from "./components/features/pasaporte/Unete";
import Comunidad from "./pages/Comunidad";
import BoliviaPlay from "./pages/BoliviaPlay";
import Ranking from "./pages/Ranking";
import ComunidadTienda from "./pages/ComunidadTienda";
import Tienda from "./pages/tienda/Tienda";
import Login from "./pages/tienda/Login.jsx";
import ProductoDetalle from './pages/tienda/ProductoDetalle';
import { AuthProvider } from './components/common/AuthContext';
import { CartProvider } from './components/common/CartContext';
import Perfil from './pages/tienda/Perfil';
import Carrito from './pages/tienda/Carrito';
import Confirmacion from './pages/tienda/Confirmacion';


const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <StoresSection />
                <PasaporteLudico />
                <FeaturedGames />
              </>
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
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;