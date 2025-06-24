import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistroCliente from '../pages/RegistroCliente';
// ...importa aquí otras páginas públicas si las tienes...

const PublicRoutes = () => (
  <Routes>
    <Route path="/registro" element={<RegistroCliente />} />
    {/* Agrega aquí otras rutas públicas si es necesario */}
  </Routes>
);

export default PublicRoutes;
