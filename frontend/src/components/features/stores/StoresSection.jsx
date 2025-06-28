import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StoreCard from './StoreCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../styles/swiper.css';
import StoreModal from './StoreModal';
import { getTiendas } from '../../../services/tiendaService';

const StoresSection = () => {
  const { t } = useTranslation();
  const [selectedStore, setSelectedStore] = useState(null);
  const [storesByCity, setStoresByCity] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTiendas().then(tiendas => {
      // Agrupar por ciudad/ubicacion
      const grouped = {};
      tiendas.forEach(store => {
        const city = store.ubicacion || 'N/A';
        if (!grouped[city]) grouped[city] = [];
        grouped[city].push(store);
      });
      setStoresByCity(grouped);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-8 sm:py-16 flex items-center justify-center text-lg text-neutral-500">Cargando...</div>;
  }

  return (
    <section className="py-8 sm:py-16 bg-card">
      <div className="container mx-auto px-1 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground" data-aos="fade-up" data-aos-duration="1000">
          {t('partner')}
        </h2>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="stores-swiper"
            speed={700}
            style={{overflow: 'hidden'}}
          >
            {Object.entries(storesByCity).map(([city, stores], idx) => (
              <SwiperSlide key={city}>
                <div
                  className="bg-white rounded-lg shadow-lg p-4 sm:p-8 flex flex-col items-center h-full border-2 border-transparent stores-slide group transition-all duration-300 min-w-0 max-w-full"
                  style={{ boxSizing: 'border-box' }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary text-center">{city}</h3>
                  <ul className="flex flex-col items-center justify-center h-full w-full space-y-4 sm:space-y-6">
                    {stores.map((store, i) => (
                      <li
                        key={store._id || i}
                        className="flex items-center gap-3 sm:gap-4 border-b pb-3 sm:pb-4 last:border-b-0 last:pb-0 cursor-pointer hover:bg-gray-100 p-2 rounded transition-all duration-200 hover:shadow-lg hover:scale-[1.03] group"
                        onClick={() => setSelectedStore(store)}
                        tabIndex={0}
                        aria-label={`Ver detalles de ${store.nombre || 'N/A'}`}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm relative">
                          <img
                            src={store.logo || 'https://via.placeholder.com/48?text=Logo'}
                            alt={`${store.nombre || 'N/A'} logo`}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full"
                            title={store.nombre || 'N/A'}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/48?text=Logo';
                            }}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="font-bold text-base sm:text-lg text-foreground flex items-center gap-2 flex-wrap">
                            {store.nombre || 'N/A'}
                          </div>
                          <div className="text-accent mb-1 text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">{store.descripcion || 'N/A'}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <StoreModal
        store={selectedStore}
        isOpen={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </section>
  );
};

export default StoresSection;