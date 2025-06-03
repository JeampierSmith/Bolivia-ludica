import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Simulación de productos (en producción, importar desde un archivo o contexto)
import productos from './TiendaProductos';

const ProductoDetalle = () => {
  const { productoSlug } = useParams();
  const producto = productos.find(p => slugify(p.nombre) === productoSlug);

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <Link to="/tienda" className="text-primary underline">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
      <div className="flex-1 flex flex-col items-center">
        <div className="bg-gray-100 rounded-xl flex items-center justify-center w-full max-w-md aspect-square mb-4 relative">
          <img src={producto.imagen} alt={producto.nombre} className="object-contain max-h-96 w-full" />
        </div>
        <div className="flex gap-2 mt-2">
          <img src={producto.imagen} alt={producto.nombre} className="w-20 h-20 object-contain border-2 border-primary rounded cursor-pointer" />
        </div>
      </div>
      <div className="flex-1 max-w-xl">
        <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
        <div className="text-primary text-2xl font-bold mb-2">{producto.precio}</div>
        <div className="mb-2 text-gray-600">Tienda: <span className="font-semibold">{producto.tienda}</span></div>
        <div className="mb-6 text-gray-500">Departamento: {producto.departamento}</div>
        <div className="flex items-center gap-2 mb-6">
          <label htmlFor="cantidad" className="font-medium">Cantidad</label>
          <input id="cantidad" type="number" min="1" defaultValue="1" className="border rounded px-2 py-1 w-16" />
          <button className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-primary/90 transition">Añadir al carrito</button>
          <button className="ml-2 text-2xl text-gray-400 hover:text-primary transition" title="Favorito">♡</button>
        </div>
        <div className="flex gap-3 mb-6">
          <button className="bg-gray-100 rounded-full p-2 text-xl hover:bg-gray-200 transition" title="Compartir en Facebook">f</button>
          <button className="bg-gray-100 rounded-full p-2 text-xl hover:bg-gray-200 transition" title="Compartir en Twitter">t</button>
          <button className="bg-gray-100 rounded-full p-2 text-xl hover:bg-gray-200 transition" title="Compartir en Pinterest">p</button>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-orange-500">
            <span>🔒</span> <span>Página web segura</span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-orange-500">
            <span>🚚</span> <span>Entrega rápida y en 24 horas</span>
          </div>
          <div className="flex items-center gap-2 text-orange-500">
            <span>🛠️</span> <span>¿Tienes algún problema? Nosotros nos encargamos de todo.</span>
          </div>
        </div>
        <div className="border-b flex gap-8 mb-4">
          <button className="py-2 px-4 border-b-2 border-primary font-bold text-primary">Descripción</button>
          <button className="py-2 px-4 text-gray-500">Detalles del producto</button>
        </div>
        <div className="text-gray-700 mb-8">
          <p>Descripción del producto próximamente...</p>
        </div>
      </div>
    </div>
  );
};

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default ProductoDetalle;
