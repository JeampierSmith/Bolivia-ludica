import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Confirmacion = () => {
  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.style.display = 'none';
    return () => {
      if (globalHeader) globalHeader.style.display = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">¡Compra realizada con éxito!</h1>
      <div className="bg-white rounded shadow p-6 w-full max-w-md mb-6 text-center">
        <p className="mb-2">Gracias por tu compra. Pronto recibirás un correo con los detalles de tu pedido.</p>
        <p className="mb-2">Puedes seguir comprando o revisar tu perfil.</p>
      </div>
      <Link to="/tienda" className="bg-primary text-white px-4 py-2 rounded font-bold hover:bg-primary/90 transition mb-2">Volver a la tienda</Link>
      <Link to="/perfil" className="text-primary underline">Ir a mi perfil</Link>
    </div>
  );
};

export default Confirmacion;
