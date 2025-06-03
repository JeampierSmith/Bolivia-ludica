import React from 'react';

const ProductoCard = ({ producto }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center relative group border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow group-hover:shadow-md transition-all duration-300 z-10 hover:scale-110">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-red-500"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" /></svg>
      </button>
      <div className="w-full aspect-square mb-4 rounded overflow-hidden flex items-center justify-center bg-gray-100">
        <img src={producto.imagen} alt={producto.nombre} className="object-contain w-full h-full transition-transform group-hover:scale-105 duration-500 ease-in-out" />
      </div>
      <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[36px]">{producto.nombre}</h3>
      <p className="text-primary font-bold text-lg">{producto.precio}</p>
    </div>
  );
};

export default ProductoCard; 