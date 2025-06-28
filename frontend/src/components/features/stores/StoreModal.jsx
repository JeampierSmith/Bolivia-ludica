import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaStore } from 'react-icons/fa';
import { getTiendas } from '../../../services/tiendaService';

const StoreModal = ({ store, isOpen, onClose }) => {
  const [tienda, setTienda] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cerrar modal con Escape y clic fuera
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !store?._id) return;
    setLoading(true);
    getTiendas().then(tiendas => {
      const found = tiendas.find(t => t._id === store._id);
      setTienda(found || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [isOpen, store]);

  const backdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg flex items-center justify-center p-10 text-lg text-neutral-500">Cargando...</div>
      </div>
    );
  }
  if (!tienda) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg flex items-center justify-center p-10 text-lg text-neutral-500">Tienda no encontrada</div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn"
      onClick={backdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Información de la tienda ${tienda.nombre || 'N/A'}`}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg transform transition-all animate-modalPop relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-primary bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow transition-colors z-10"
          aria-label="Cerrar modal"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm relative">
                {tienda.logo ? (
                  <img 
                    src={tienda.logo} 
                    alt={`${tienda.nombre || 'N/A'} logo`} 
                    className="w-16 h-16 object-contain rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/64?text=Logo';
                    }}
                  />
                ) : (
                  <FaStore className="w-12 h-12 text-gray-300" title="Sin logo" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-primary">{tienda.nombre || 'N/A'}</h2>
                </div>
                <p className="text-gray-600">{tienda.ubicacion || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Teléfono:</h3>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-primary w-4 h-4" />
                    {tienda.telefono && tienda.telefono !== 'N/A' ? (
                      <a href={`tel:${tienda.telefono}`} className="text-gray-700 hover:text-primary">{tienda.telefono}</a>
                    ) : (
                      <span className="text-gray-400">No disponible</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Dirección:</h3>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary w-4 h-4" />
                    {tienda.direccion && tienda.direccion !== 'N/A' ? (
                      <span className="text-gray-700">{tienda.direccion}</span>
                    ) : (
                      <span className="text-gray-400">No disponible</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Email:</h3>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-primary w-4 h-4" />
                    {tienda.correo && tienda.correo !== 'N/A' ? (
                      <a href={`mailto:${tienda.correo}`} className="text-gray-700 hover:text-primary">{tienda.correo}</a>
                    ) : (
                      <span className="text-gray-400">No disponible</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Sitio Web:</h3>
                  <div className="flex items-center gap-2">
                    <FaGlobe className="text-primary w-4 h-4" />
                    {tienda.web && tienda.web !== '#' ? (
                      <a href={tienda.web} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">
                        {tienda.web.replace(/^https?:\/\//, '')}
                      </a>
                    ) : (
                      <span className="text-gray-400">No disponible</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Horarios:</h3>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-primary w-4 h-4" />
                    {tienda.horarios && tienda.horarios !== 'N/A' ? (
                      <span className="text-gray-700">{tienda.horarios}</span>
                    ) : (
                      <span className="text-gray-400">No disponible</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Redes Sociales:</h3>
              <div className="flex gap-4">
                {tienda.redesSociales?.facebook && (
                  <a href={tienda.redesSociales.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="Facebook">
                    <FaFacebook className="w-7 h-7 transition-transform hover:scale-110" />
                  </a>
                )}
                {tienda.redesSociales?.instagram && (
                  <a href={tienda.redesSociales.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800" title="Instagram">
                    <FaInstagram className="w-7 h-7 transition-transform hover:scale-110" />
                  </a>
                )}
                {tienda.tiktok && (
                  <a href={tienda.tiktok} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800" title="TikTok">
                    <FaTiktok className="w-7 h-7 transition-transform hover:scale-110" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;
