import React from 'react';
import { useParams, Link } from 'react-router-dom';
import departamentos from './ComunidadData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Utilidad para normalizar el nombre de la tienda en la URL
function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getAllAmbientes(tienda) {
  // Si el campo ambiente es un array, retorna todas, si es string, retorna array con una
  if (Array.isArray(tienda.ambiente)) return tienda.ambiente;
  if (typeof tienda.ambiente === 'string') return [tienda.ambiente];
  return [];
}

const ComunidadTienda = () => {
  const { tiendaSlug } = useParams();
  // Buscar la tienda por slug en todos los departamentos
  let tienda = null;
  let depto = null;
  for (const d of departamentos) {
    tienda = d.tiendas.find(t => slugify(t.nombre) === tiendaSlug);
    if (tienda) {
      depto = d;
      break;
    }
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
  const descripcion = tienda.descripcion || "Ambiente acogedor para toda la familia y comunidad jugona.";
  const direccion = tienda.direccion || "Ubicación cercana al mercado XYZ";
  const telefono = tienda.telefono || "+591 70000000";
  const email = tienda.email || "contacto@ejemplo.com";
  const web = tienda.web || null;
  const redes = tienda.redes || { facebook: "https://facebook.com/bolivialudica" };
  const horario = tienda.horario || { "Lunes a Sábado": "16:00 - 22:00" };
  const juegos = tienda.juegos || ["CATAN", "Dixit", "Exploding Kittens"];
  const eventos = tienda.eventos || ["Torneos mensuales de TCG", "Domingos familiares de juegos"];
  // DEBUG: Log all slugs for Santa Cruz tiendas
  if (process.env.NODE_ENV !== 'production') {
    const sc = departamentos.find(d => d.nombre === 'Santa Cruz');
    if (sc) {
      // eslint-disable-next-line no-console
      console.log('DEBUG Santa Cruz tiendas:', sc.tiendas.map(t => ({nombre: t.nombre, slug: slugify(t.nombre)})));
    }
    // eslint-disable-next-line no-console
    console.log('DEBUG URL tiendaSlug:', tiendaSlug);
  }
  return (
    <section className="py-16 min-h-[60vh] bg-white">
      <div className="max-w-lg mx-auto bg-white/90 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow p-6 lg:p-10 flex flex-col items-center border border-yellow-100 backdrop-blur-sm">
        <div className="w-36 h-36 rounded-full shadow-lg border-4 border-yellow-400 flex items-center justify-center bg-white mb-4">
          <img src={tienda.logo} alt={tienda.nombre} className="w-32 h-32 object-contain rounded-full" style={{filter:'drop-shadow(0 2px 8px #facc15)'}} onError={e => (e.target.style.opacity = 0.2)} />
        </div>
        <h2 className="text-4xl font-bold text-yellow-700 font-[prototype] mb-1 tracking-wide uppercase text-center drop-shadow">{tienda.nombre}</h2>
        <div className="text-neutral-700 mb-2 text-lg font-semibold text-center">
          {depto.nombre} <span className="mx-1">|</span> <span className="text-yellow-700">{tienda.especialidad}</span>
        </div>
        <p className="text-neutral-700 text-center mb-4 text-base italic">{descripcion}</p>
        {/* Dirección, contacto, redes, horario */}
        <div className="w-full flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-neutral-700 text-base">
            <span role="img" aria-label="ubicacion">📍</span>
            <span>{direccion}</span>
          </div>
          {telefono && (
            <a href={`tel:${telefono}`} className="flex items-center gap-2 text-blue-700 hover:underline">
              <span role="img" aria-label="telefono">📞</span>
              <span>{telefono}</span>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-blue-700 hover:underline">
              <span role="img" aria-label="email">✉️</span>
              <span>{email}</span>
            </a>
          )}
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 hover:underline">
              <span role="img" aria-label="web">🌐</span>
              <span>Web</span>
            </a>
          )}
          {/* Redes sociales */}
          {redes.facebook && (
            <a href={redes.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 hover:underline">
              <span role="img" aria-label="facebook">📘</span>
              <span>Facebook</span>
            </a>
          )}
          {redes.instagram && (
            <a href={redes.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 hover:underline">
              <span role="img" aria-label="instagram">📸</span>
              <span>Instagram</span>
            </a>
          )}
        </div>
        {/* Horario */}
        {horario && (
          <div className="w-full mb-4">
            <div className="font-semibold text-neutral-700 mb-1 flex items-center gap-2"><span role="img" aria-label="horario">⏰</span> Horarios:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(horario).map(([dia, h]) => (
                <span key={dia} className="bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 text-xs font-semibold">{dia}: {h}</span>
              ))}
            </div>
          </div>
        )}
        {/* Carrusel de ambientes mejorado */}
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
              {ambientes.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={`Ambiente ${tienda.nombre} ${i+1}`} className="w-full h-52 object-cover" style={{borderRadius:'0.75rem', maxHeight:'15rem', objectFit:'cover'}} onError={e => (e.target.style.opacity = 0.2)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* Juegos destacados */}
        {juegos.length > 0 && (
          <div className="w-full mb-6">
            <h3 className="text-lg font-bold text-neutral-800 mb-2">Juegos disponibles</h3>
            <div className="flex flex-wrap gap-2">
              {juegos.map(j => (
                <span key={j} className="bg-neutral-100 text-neutral-800 rounded-full px-3 py-1 text-xs font-semibold border border-yellow-200">{j}</span>
              ))}
            </div>
          </div>
        )}
        {/* Eventos */}
        {eventos.length > 0 && (
          <div className="w-full mb-6">
            <h3 className="text-lg font-bold text-neutral-800 mb-2">Eventos regulares</h3>
            <ul className="list-disc pl-5">
              {eventos.map((ev, i) => (
                <li key={i} className="text-neutral-700 text-sm mb-1">{ev}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Mensaje si no hay info */}
        {(!direccion || direccion.includes('Próximamente')) && (
          <div className="w-full text-center text-neutral-500 text-sm mt-4">
            ℹ️ Próximamente más información, fotos y eventos. ¡Síguenos en nuestras redes!
          </div>
        )}
        <Link to="/comunidad" className="w-full mt-8">
          <button className="w-full px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-md text-lg transition">⬅️ Volver a Nuestra Comunidad</button>
        </Link>
      </div>
    </section>
  );
};

export default ComunidadTienda;
