import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const StoreModal = ({ store, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded">
                <img 
                  src={store.logo} 
                  alt={`${store.name} logo`} 
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/64?text=Logo';
                  }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">{store.name}</h2>
                <p className="text-gray-600">{store.location}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {store.phone && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Teléfono:</h3>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-primary w-4 h-4" />
                      <a href={`tel:${store.phone}`} className="text-gray-700 hover:text-primary">
                        {store.phone}
                      </a>
                    </div>
                  </div>
                )}

                {store.address && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Dirección:</h3>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary w-4 h-4" />
                      <span className="text-gray-700">{store.address}</span>
                    </div>
                  </div>
                )}

                {store.specialty && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Especialidad:</h3>
                    <p className="text-gray-700">{store.specialty}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {store.email && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Email:</h3>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-primary w-4 h-4" />
                      <a href={`mailto:${store.email}`} className="text-gray-700 hover:text-primary">
                        {store.email}
                      </a>
                    </div>
                  </div>
                )}

                {store.website && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Sitio Web:</h3>
                    <div className="flex items-center gap-2">
                      <FaGlobe className="text-primary w-4 h-4" />
                      <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">
                        {store.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}

                {store.schedule && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Horarios:</h3>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-primary w-4 h-4" />
                      <span className="text-gray-700">{store.schedule}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Redes Sociales:</h3>
              <div className="flex gap-4">
                {store.facebook && (
                  <a href={store.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                )}
                {store.instagram && (
                  <a href={store.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                )}
                {store.tiktok && (
                  <a href={store.tiktok} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
                    <FaTiktok className="w-6 h-6" />
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