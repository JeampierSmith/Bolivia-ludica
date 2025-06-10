import React from 'react';
import { useCart } from './common/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductoCard = ({ producto, headingLevel = 3 }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [feedback, setFeedback] = React.useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(producto, 1);
    setFeedback(true);
    setTimeout(() => setFeedback(false), 1200);
  };
  const handleVerMas = (e) => {
    e.preventDefault();
    navigate(`/tienda/${producto.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`);
  };
  const Heading = `h${headingLevel}`;
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center relative group border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer">
      {/* Badge visual */}
      {producto.badge && (
        <span className={`absolute left-2 top-2 px-2 py-0.5 rounded-full text-xs font-bold z-10
          ${producto.badge === 'Nuevo' ? 'bg-green-700 text-white border border-green-900' : ''}
          ${producto.badge === 'Popular' ? 'bg-blue-700 text-white border border-blue-900' : ''}
          ${producto.badge === 'En oferta' ? 'bg-red-700 text-white border border-red-900' : ''}
          bg-white text-black border border-gray-300 shadow-sm
        `}>
          {producto.badge}
        </span>
      )}
      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow group-hover:shadow-md transition-all duration-300 z-10 hover:scale-110"
        aria-label={producto.favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        title={producto.favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={e => { e.preventDefault(); /* lógica de favorito aquí */ }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-red-500"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" /></svg>
      </button>
      <div className="w-full aspect-square mb-4 rounded overflow-hidden flex items-center justify-center bg-gray-100">
        <img src={producto.imagen} alt={producto.nombre} className="object-contain w-full h-full transition-transform group-hover:scale-105 duration-500 ease-in-out" />
      </div>
      <Heading className="text-sm font-semibold text-black mb-1 line-clamp-2 min-h-[36px] bg-white px-1 rounded">{producto.nombre}</Heading>
      <p className="text-primary font-bold text-lg bg-white px-1 rounded text-black">{producto.precio}</p>
      {/* Botones de acción */}
      <div className="flex gap-2 mt-3 w-full justify-center">
        <button className="bg-primary text-white px-3 py-1 rounded font-semibold text-sm hover:bg-primary/90 transition" onClick={handleAdd}>Añadir al carrito</button>
        <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold text-sm hover:bg-gray-200 transition" onClick={handleVerMas}>Ver más</button>
      </div>
      {feedback && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-2 rounded shadow-lg font-bold animate-bounce-in">
          ¡Producto añadido al carrito!
        </div>
      )}
    </div>
  );
};

export default ProductoCard;