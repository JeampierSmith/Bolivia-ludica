import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTiendas } from '../services/tiendaService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Utilidad para normalizar el nombre de la tienda en la URL
function slugify(str) {
  return (str || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getAllAmbientes(tienda) {
  // Si el campo ambiente es un array, retorna todas, si es string, retorna array con una
  if (Array.isArray(tienda.ambiente)) return tienda.ambiente;
  if (typeof tienda.ambiente === 'string') return [tienda.ambiente];
  return [];
}

const ComunidadTienda = () => {
  const { tiendaSlug } = useParams();
  const [tienda, setTienda] = useState(null);
  const [depto, setDepto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTiendas().then(tiendas => {
      // Agrupar por departamento
      const agrupadas = tiendas.reduce((acc, t) => {
        const depto = t.ubicacion || 'N/A';
        if (!acc[depto]) acc[depto] = [];
        acc[depto].push(t);
        return acc;
      }, {});
      let foundTienda = null;
      let foundDepto = null;
      for (const [nombre, tiendasDepto] of Object.entries(agrupadas)) {
        foundTienda = tiendasDepto.find(t => slugify(t.nombre) === tiendaSlug);
        if (foundTienda) {
          foundDepto = { nombre, tiendas: tiendasDepto };
          break;
        }
      }
      setTienda(foundTienda);
      setDepto(foundDepto);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [tiendaSlug]);

  if (loading) {
    return <div className="py-16 min-h-[60vh] flex items-center justify-center text-lg text-neutral-500">Cargando...</div>;
  }

  if (!tienda) {
    return (
      <section className="py-16 min-h-[60vh] bg-gray-50">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8 flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full shadow-md border-4 border-yellow-400 flex items-center justify-center bg-white mb-4">
              <img src="/Bolivia-ludica/assets/image/meeple-icon.svg" alt="Meeple" className="w-16 h-16 opacity-60" />
            </div>
            <h2 className="text-3xl font-bold text-yellow-700 font-[prototype] mb-2">Tienda no encontrada</h2>
            <p className="text-neutral-700 text-center max-w-md">Próximamente más información, fotos y eventos. ¡Síguenos en nuestras redes!</p>
          </div>
          <Link to="/comunidad">
            <button className="mt-6 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-md text-lg">⬅️ Volver a Nuestra Comunidad</button>
          </Link>
        </div>
      </section>
    );
  }
  // Soportar múltiples imágenes de ambiente o una sola
  const ambientes = getAllAmbientes(tienda);
  // Datos mock para demo visual (puedes reemplazar por datos reales en el futuro)
  const descripcion = tienda.descripcion || 'N/A';
  const direccion = tienda.direccion || 'N/A';
  const telefono = tienda.telefono || 'N/A';
  const correo = tienda.correo || 'N/A';
  const horarios = tienda.horarios || 'N/A';
  const tiktok = tienda.tiktok || 'N/A';
  const redes = tienda.redesSociales || {};
  const facebook = redes.facebook || 'N/A';
  const instagram = redes.instagram || 'N/A';

  return (
    <section className="py-16 min-h-[60vh] bg-white">
      <div className="max-w-lg mx-auto bg-white/90 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-6 lg:p-10 flex flex-col items-center border border-yellow-100 backdrop-blur-sm">
        <div className="w-36 h-36 rounded-full shadow-lg border-4 border-yellow-400 flex items-center justify-center bg-white mb-4">
          <img src={tienda.logo || ''} alt={tienda.nombre || 'N/A'} className="w-32 h-32 object-contain rounded-full" style={{filter:'drop-shadow(0 2px 8px #facc15)'}} onError={e => (e.target.style.opacity = 0.2)} />
        </div>
        <h2 className="text-4xl font-bold text-yellow-700 font-[prototype] mb-1 tracking-wide uppercase text-center drop-shadow">{tienda.nombre || 'N/A'}</h2>
        <div className="text-neutral-700 mb-2 text-lg font-semibold text-center">
          {(depto && depto.nombre) || 'N/A'} <span className="mx-1">|</span> <span className="text-yellow-700">{tienda.especialidad || 'N/A'}</span>
        </div>
        <p className="text-neutral-700 text-center mb-4 text-base italic">{descripcion}</p>
        {/* Dirección, contacto, redes, horario */}
        <div className="w-full flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-neutral-700 text-base">
            <span role="img" aria-label="ubicacion">📍</span>
            <span>{direccion}</span>
          </div>
          {telefono !== 'N/A' && (
            <a href={`tel:${telefono}`} className="flex items-center gap-2 text-blue-700 hover:underline">
              <span role="img" aria-label="telefono">📞</span>
              <span>{telefono}</span>
            </a>
          )}
          {correo !== 'N/A' && (
            <a href={`mailto:${correo}`} className="flex items-center gap-2 text-blue-700 hover:underline">
              <span role="img" aria-label="email">✉️</span>
              <span>{correo}</span>
            </a>
          )}
          {facebook !== 'N/A' && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 hover:underline">
              <span role="img" aria-label="facebook">📘</span>
              <span>Facebook</span>
            </a>
          )}
          {instagram !== 'N/A' && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 hover:underline">
              <span role="img" aria-label="instagram">📸</span>
              <span>Instagram</span>
            </a>
          )}
          {tiktok !== 'N/A' && (
            <span className="flex items-center gap-2 text-black/70">
              <span role="img" aria-label="tiktok">🎵</span>
              <span>{tiktok}</span>
            </span>
          )}
        </div>
        {/* Horario */}
        <div className="w-full mb-4">
          <div className="font-semibold text-neutral-700 mb-1 flex items-center gap-2"><span role="img" aria-label="horario">⏰</span> Horarios:</div>
          <div className="flex flex-wrap gap-2">
            {horarios !== 'N/A' ? (
              <span className="bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs font-semibold">{horarios}</span>
            ) : (
              <span className="text-neutral-400 text-xs">N/A</span>
            )}
          </div>
        </div>
        {/* Carrusel de ambientes */}
        <div className="w-full mb-8">
          <h3 className="text-lg font-bold text-neutral-800 mb-2 tracking-wide">Ambiente</h3>
          <div className="rounded-xl overflow-hidden bg-neutral-100 border border-yellow-100">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="rounded-xl"
              style={{width:'100%', minHeight:'180px'}}
            >
              {ambientes.length > 0 ? ambientes.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={`Ambiente ${tienda.nombre || 'N/A'} ${i+1}`} className="w-full h-52 object-cover" style={{borderRadius:'0.75rem', maxHeight:'15rem', objectFit:'cover'}} onError={e => (e.target.style.opacity = 0.2)} />
                </SwiperSlide>
              )) : (
                <SwiperSlide>
                  <div className="w-full h-52 flex items-center justify-center text-neutral-400">N/A</div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
        <Link to="/comunidad" className="w-full mt-8">
          <button className="w-full px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-md text-lg transition">⬅️ Volver a Nuestra Comunidad</button>
        </Link>
      </div>
    </section>
  );
};

export default ComunidadTienda;
