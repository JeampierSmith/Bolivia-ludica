import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productos from './TiendaProductos';
import { TiendaHeader } from './Tienda.jsx';
import { useCart } from '../../components/common/CartContext';

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const ProductoDetalle = () => {
  const { productoSlug } = useParams();
  const producto = productos.find(p => slugify(p.nombre) === productoSlug);
  const { addToCart } = useCart();

  // Ocultar header global y restaurar al salir
  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.style.display = 'none';
    return () => {
      if (globalHeader) globalHeader.style.display = '';
    };
  }, []);

  const [tab, setTab] = useState('descripcion');
  const [feedback, setFeedback] = useState(false);

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <Link to="/tienda" className="text-primary underline">Volver a la tienda</Link>
      </div>
    );
  }

  // Demo: galería de imágenes (en el futuro, producto.imagenes sería un array)
  const imagenes = producto.imagenes || [producto.imagen];
  const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenes[0]);
  const [zoomAbierto, setZoomAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader 
        departamentoSeleccionado={null}
        setDepartamentoSeleccionado={() => {}}
        busqueda={''}
        setBusqueda={() => {}}
        onLoginClick={() => {}}
      />
      <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-gray-100 rounded-xl flex items-center justify-center w-full max-w-md aspect-square mb-4 relative cursor-zoom-in" onClick={() => setZoomAbierto(true)}>
            <img src={imagenSeleccionada} alt={producto.nombre} className="object-contain max-h-96 w-full transition-transform duration-300 hover:scale-105" />
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">Zoom</span>
          </div>
          <div className="flex gap-2 mt-2">
            {imagenes.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={producto.nombre + ' miniatura ' + (i+1)}
                className={`w-20 h-20 object-contain border-2 rounded cursor-pointer transition-all ${img === imagenSeleccionada ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => setImagenSeleccionada(img)}
              />
            ))}
          </div>
          {/* Modal de zoom */}
          {zoomAbierto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setZoomAbierto(false)}>
              <img src={imagenSeleccionada} alt={producto.nombre + ' zoom'} className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" />
              <button className="absolute top-6 right-8 text-white text-3xl font-bold" onClick={() => setZoomAbierto(false)} aria-label="Cerrar zoom">×</button>
            </div>
          )}
        </div>
        <div className="flex-1 max-w-xl">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            {producto.nombre}
            {/* Badge visual si existe */}
            {producto.badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ml-2
                ${producto.badge === 'Nuevo' ? 'bg-green-500 text-white' : ''}
                ${producto.badge === 'Popular' ? 'bg-blue-500 text-white' : ''}
                ${producto.badge === 'En oferta' ? 'bg-red-500 text-white' : ''}
              `}>
                {producto.badge}
              </span>
            )}
          </h1>
          <div className="text-primary text-2xl font-bold mb-2">{producto.precio}</div>
          <div className="mb-2 text-gray-600">Tienda: <span className="font-semibold">{producto.tienda}</span></div>
          <div className="mb-6 text-gray-500">Departamento: {producto.departamento}</div>
          {/* Mostrar categoría si existe */}
          {producto.categoria && (
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded border border-primary/20">{producto.categoria}</span>
            </div>
          )}
          <div className="flex items-center gap-2 mb-6">
            <label htmlFor="cantidad" className="font-medium">Cantidad</label>
            <input id="cantidad" type="number" min="1" defaultValue="1" className="border rounded px-2 py-1 w-16" />
            <button
              className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-primary/90 transition"
              onClick={() => {
                addToCart(producto, 1);
                setFeedback(true);
                setTimeout(() => setFeedback(false), 1500);
              }}
            >Añadir al carrito</button>
            <button className="ml-2 text-2xl text-gray-400 hover:text-primary transition" title="Favorito">♡</button>
          </div>
          {feedback && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-2 rounded shadow-lg font-bold animate-bounce-in">
              ¡Producto añadido al carrito!
            </div>
          )}
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
            <button className={`py-2 px-4 font-bold transition border-b-2 ${tab === 'descripcion' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`} onClick={() => setTab('descripcion')}>Descripción</button>
            <button className={`py-2 px-4 font-bold transition border-b-2 ${tab === 'detalles' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`} onClick={() => setTab('detalles')}>Detalles del producto</button>
            <button className={`py-2 px-4 font-bold transition border-b-2 ${tab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`} onClick={() => setTab('reviews')}>Reseñas</button>
            <button className={`py-2 px-4 font-bold transition border-b-2 ${tab === 'relacionados' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`} onClick={() => setTab('relacionados')}>Relacionados</button>
          </div>
          {/* Contenido de tabs */}
          {tab === 'descripcion' && (
            <div className="text-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-2">Descripción</h2>
              <p>{producto.descripcion || 'Este producto es ideal para toda la familia y perfecto para tus reuniones lúdicas. ¡Próximamente más detalles!'}</p>
            </div>
          )}
          {tab === 'detalles' && (
            <div className="text-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-2">Detalles del producto</h2>
              <ul className="list-disc pl-6">
                <li><b>Precio:</b> {producto.precio}</li>
                <li><b>Tienda:</b> {producto.tienda}</li>
                <li><b>Departamento:</b> {producto.departamento}</li>
                {producto.categoria && <li><b>Categoría:</b> {producto.categoria}</li>}
                {/* Puedes agregar más detalles técnicos aquí */}
              </ul>
            </div>
          )}
          {tab === 'reviews' && (
            <div className="text-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-2">Reseñas de clientes</h2>
              <div className="mb-4">⭐️⭐️⭐️⭐️☆ (4.0) - 2 reseñas</div>
              <div className="mb-2 p-3 bg-gray-50 rounded border">
                <div className="font-semibold">Juan P.</div>
                <div className="text-sm">Muy buen producto, llegó rápido y en excelente estado.</div>
              </div>
              <div className="mb-2 p-3 bg-gray-50 rounded border">
                <div className="font-semibold">María L.</div>
                <div className="text-sm">Ideal para jugar en familia. ¡Recomendado!</div>
              </div>
              <button className="mt-4 bg-primary text-white px-4 py-2 rounded font-bold hover:bg-primary/90 transition">Escribir reseña</button>
            </div>
          )}
          {tab === 'relacionados' && (
            <div className="text-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-4">Productos relacionados</h2>
              <div className="grid grid-cols-2 gap-4">
                {productos.filter(p => p.categoria === producto.categoria && p.nombre !== producto.nombre).slice(0, 4).map((rel, i) => (
                  <div key={i} className="bg-white rounded shadow p-2 flex flex-col items-center border border-gray-100">
                    <img src={rel.imagen} alt={rel.nombre} className="w-20 h-20 object-contain mb-2" />
                    <div className="font-semibold text-sm text-center line-clamp-2 mb-1">{rel.nombre}</div>
                    <div className="text-primary font-bold text-sm mb-1">{rel.precio}</div>
                    <Link to={`/tienda/${slugify(rel.nombre)}`} className="text-xs text-primary underline">Ver detalle</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
