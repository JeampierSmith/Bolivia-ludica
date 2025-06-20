import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaStore } from 'react-icons/fa';

const StoreModal = ({ store, isOpen, onClose }) => {
  // Cerrar modal con Escape y clic fuera
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const backdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn"
      onClick={backdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Información de la tienda ${store.name}`}
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
                {store.logo ? (
                  <img 
                    src={store.logo} 
                    alt={`${store.name} logo`} 
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
                  <h2 className="text-2xl font-bold text-primary">{store.name}</h2>
                  {store.specialty && (
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded border border-primary/20" title={store.specialty}>{store.specialty}</span>
                  )}
                </div>
                <p className="text-gray-600">{store.location}</p>
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
                    {store.phone && store.phone !== 'N/A' ? (
                      <a href={`tel:${store.phone}`} className="text-gray-700 hover:text-primary">{store.phone}</a>
                    ) : (
                      <span className="text-gray-400">No disponible</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Dirección:</h3>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary w-4 h-4" />
                    {store.address && store.address !== 'Dirección no disponible' ? (
                      <span className="text-gray-700">{store.address}</span>
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
                    {store.email && store.email !== 'N/A' ? (
                      <a href={`mailto:${store.email}`} className="text-gray-700 hover:text-primary">{store.email}</a>
                    ) : (
                      <span className="text-gray-400">No disponible</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Sitio Web:</h3>
                  <div className="flex items-center gap-2">
                    <FaGlobe className="text-primary w-4 h-4" />
                    {store.website && store.website !== '#' ? (
                      <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">
                        {store.website.replace(/^https?:\/\//, '')}
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
                    {store.schedule && store.schedule !== 'Horario no disponible' ? (
                      <span className="text-gray-700">{store.schedule}</span>
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
                {store.facebook && (
                  <a href={store.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="Facebook">
                    <FaFacebook className="w-7 h-7 transition-transform hover:scale-110" />
                  </a>
                )}
                {store.instagram && (
                  <a href={store.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800" title="Instagram">
                    <FaInstagram className="w-7 h-7 transition-transform hover:scale-110" />
                  </a>
                )}
                {store.tiktok && (
                  <a href={store.tiktok} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800" title="TikTok">
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
