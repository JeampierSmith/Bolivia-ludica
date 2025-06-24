import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TiendaHeader } from './Tienda.jsx';
import { useCart } from '../../components/common/CartContext.jsx';
import Modal from '../../components/common/Modal.jsx';
import LoginForm from '../../components/features/auth/LoginForm.jsx';
import UneteForm from '../../components/features/auth/UneteForm.jsx';
import { useAuth } from '../../components/common/AuthContext.jsx';

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const API_URL = import.meta.env.VITE_API_URL || '';

const ProductoDetalle = () => {
  const { productoSlug } = useParams();
  const { addToCart } = useCart();
  const { login, user } = useAuth();
  // Modal login/registro state
  const [showAuth, setShowAuth] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [tab, setTab] = useState('descripcion');
  const [feedback, setFeedback] = useState(false);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  // Ocultar header global y restaurar al salir
  useEffect(() => {
    const globalHeader = document.querySelector('header.bg-card');
    if (globalHeader) globalHeader.style.display = 'none';
    return () => {
      if (globalHeader) globalHeader.style.display = '';
    };
  }, []);

  useEffect(() => {
    // Cargar productos y buscar el producto por slug
    const fetchProducto = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/productos`);
        const data = await res.json();
        const prod = data.find(p => slugify(p.nombre) === productoSlug);
        setProducto(prod || null);
        // Relacionados: misma categoría, distinto nombre
        setProductosRelacionados(
          prod && prod.categoria
            ? data.filter(p => p.categoria === prod.categoria && p.nombre !== prod.nombre).slice(0, 4)
            : []
        );
      } catch (err) {
        setProducto(null);
        setProductosRelacionados([]);
      }
      setLoading(false);
    };
    fetchProducto();
  }, [productoSlug]);

  const uploadsUrl = import.meta.env.VITE_UPLOADS_URL || '';
  let imagenes = [];
  if (producto) {
    if (producto.imagenes && Array.isArray(producto.imagenes) && producto.imagenes.length > 0) {
      imagenes = producto.imagenes.map(img => img?.startsWith('/uploads') ? uploadsUrl + img : img);
    } else if (producto.imagen) {
      imagenes = [producto.imagen.startsWith('/uploads') ? uploadsUrl + producto.imagen : producto.imagen];
    } else {
      imagenes = ["/assets/image/placeholder-product.png"];
    }
  }
  const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenes[0]);
  useEffect(() => {
    setImagenSeleccionada(imagenes[0]);
  }, [productoSlug, producto]);
  const [zoomAbierto, setZoomAbierto] = useState(false);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Cargando producto...</div>;
  }
  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <Link to="/tienda" className="text-primary underline">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f9]">
      <TiendaHeader 
        departamentoSeleccionado={null}
        setDepartamentoSeleccionado={() => {}}
        busqueda={''}
        setBusqueda={() => {}}
        onLoginClick={() => setShowAuth(true)}
      />
      <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-gray-100 rounded-xl flex items-center justify-center w-full max-w-md aspect-square mb-4 relative cursor-zoom-in" onClick={() => setZoomAbierto(true)} aria-label="Abrir zoom de imagen principal">
            <img src={imagenSeleccionada} alt={producto.nombre} className="object-contain max-h-96 w-full transition-transform duration-300 hover:scale-105" />
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">Zoom</span>
          </div>
          <div className="flex gap-2 mt-2" aria-label="Galería de miniaturas">
            {imagenes.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${producto.nombre} miniatura ${i+1}`}
                className={`w-20 h-20 object-contain border-2 rounded cursor-pointer transition-all ${img === imagenSeleccionada ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => setImagenSeleccionada(img)}
                tabIndex={0}
                aria-label={`Seleccionar imagen miniatura ${i+1}`}
              />
            ))}
          </div>
          {/* Modal de zoom */}
          {zoomAbierto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setZoomAbierto(false)} aria-modal="true" role="dialog">
              <img src={imagenSeleccionada} alt={`${producto.nombre} zoom`} className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" />
              <button className="absolute top-6 right-8 text-white text-3xl font-bold" onClick={() => setZoomAbierto(false)} aria-label="Cerrar zoom">×</button>
            </div>
          )}
        </div>
        <div className="flex-1 max-w-xl">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">{producto.nombre}
            {/* Badge visual si existe */}
            {producto.badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ml-2
                ${producto.badge === 'Nuevo' ? 'bg-[#065f46] text-white' : ''}
                ${producto.badge === 'Popular' ? 'bg-blue-700 text-white' : ''}
                ${producto.badge === 'En oferta' ? 'bg-red-700 text-white border border-yellow-200 shadow-sm' : ''}
              `} style={producto.badge === 'En oferta' ? {textShadow:'0 1px 2px #000'} : {}}>
                {producto.badge}
              </span>
            )}
          </h1>
          <div className="text-primary text-2xl font-bold mb-2">{producto.precio} Bs</div>
          {/* Mostrar categoría si existe */}
          {producto.categoria && (
            <div className="mb-4">
              {Array.isArray(producto.categoria) ? producto.categoria.map((cat, i) => (
                <span key={i} className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded border border-primary/20 mr-2">{cat}</span>
              )) : (
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded border border-primary/20">{producto.categoria}</span>
              )}
            </div>
          )}
          <div className="flex items-center gap-2 mb-6">
            <label htmlFor="cantidad" className="font-medium">Cantidad</label>
            <input id="cantidad" type="number" min="1" defaultValue="1" className="border rounded px-2 py-1 w-16" aria-label="Cantidad" />
            <button
              className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-primary/90 transition"
              onClick={() => {
                addToCart(producto, 1);
                setFeedback(true);
                setTimeout(() => setFeedback(false), 1500);
              }}
              aria-label="Añadir al carrito"
            >Añadir al carrito</button>
            <button className="ml-2 text-2xl text-gray-400 hover:text-primary transition" title="Favorito" aria-label="Agregar a favoritos">♡</button>
          </div>
          {feedback && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-2 rounded shadow-lg font-bold animate-bounce-in">
              ¡Producto añadido al carrito!
            </div>
          )}
          <div className="flex gap-3 mb-6">
            <button className="bg-gray-100 rounded-full p-2 text-xl hover:bg-gray-200 transition" title="Compartir en Facebook">f</button>
            <button className="bg-gray-100 rounded-full p-2 text-xl hover:bg-gray-200 transition" title="Compartir en TikTok">t</button>
            <button className="bg-gray-100 rounded-full p-2 text-xl hover:bg-gray-200 transition" title="Compartir en WhathsApp">w</button>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 bg-yellow-300 text-black font-semibold px-2 py-1 rounded shadow-sm">
              <span>🔒</span> <span>Página web segura</span>
            </div>
            <div className="flex items-center gap-2 mb-2 bg-yellow-300 text-black font-semibold px-2 py-1 rounded shadow-sm">
              <span>🚚</span> <span>Entrega rápida y en 24 horas</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-300 text-black font-semibold px-2 py-1 rounded shadow-sm">
              <span>🛠️</span> <span>¿Tienes algún problema? Nosotros nos encargamos de todo.</span>
            </div>
          </div>
          <div className="border-b flex gap-8 mb-4" role="tablist" aria-label="Secciones de producto">
            <button className={`py-2 px-4 font-bold transition border-b-2 ${tab === 'descripcion' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`} onClick={() => setTab('descripcion')} role="tab" aria-selected={tab==='descripcion'} aria-controls="tab-descripcion" id="tab-btn-descripcion">Descripción</button>
            <button className={`py-2 px-4 font-bold transition border-b-2 ${tab === 'detalles' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`} onClick={() => setTab('detalles')} role="tab" aria-selected={tab==='detalles'} aria-controls="tab-detalles" id="tab-btn-detalles">Detalles del producto</button>
            <button className={`py-2 px-4 font-bold transition border-b-2 ${tab === 'relacionados' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`} onClick={() => setTab('relacionados')} role="tab" aria-selected={tab==='relacionados'} aria-controls="tab-relacionados" id="tab-btn-relacionados">Relacionados</button>
          </div>
          {/* Contenido de tabs */}
          {tab === 'descripcion' && (
            <div className="text-gray-700 mb-8" id="tab-descripcion" role="tabpanel" aria-labelledby="tab-btn-descripcion">
              <h2 className="text-xl font-bold mb-2">Descripción</h2>
              <p>{producto.descripcion || 'Este producto es ideal para toda la familia y perfecto para tus reuniones lúdicas. ¡Próximamente más detalles!'}</p>
            </div>
          )}
          {tab === 'detalles' && (
            <div className="text-gray-700 mb-8" id="tab-detalles" role="tabpanel" aria-labelledby="tab-btn-detalles">
              <h2 className="text-xl font-bold mb-2">Detalles del producto</h2>
              <ul className="list-disc pl-6">
                <li><b>Precio:</b> {producto.precio} Bs</li>
                {producto.categoria && <li><b>Categoría:</b> {producto.categoria}</li>}
                {/* Puedes agregar más detalles técnicos aquí */}
              </ul>
            </div>
          )}
          {tab === 'relacionados' && (
            <div className="text-gray-700 mb-8" id="tab-relacionados" role="tabpanel" aria-labelledby="tab-btn-relacionados">
              <h2 className="text-xl font-bold mb-4">Productos relacionados</h2>
              <div className="grid grid-cols-2 gap-4">
                {productosRelacionados.map((rel, i) => {
                  let relImg = "/assets/image/placeholder-product.png";
                  if (rel.imagenes && Array.isArray(rel.imagenes) && rel.imagenes.length > 0) {
                    relImg = rel.imagenes[0]?.startsWith('/uploads') ? uploadsUrl + rel.imagenes[0] : rel.imagenes[0];
                  } else if (rel.imagen) {
                    relImg = rel.imagen.startsWith('/uploads') ? uploadsUrl + rel.imagen : rel.imagen;
                  }
                  return (
                    <div key={i} className="bg-white rounded shadow p-2 flex flex-col items-center border border-gray-100">
                      <img src={relImg} alt={rel.nombre} className="w-20 h-20 object-contain mb-2" />
                      <div className="font-semibold text-sm text-center line-clamp-2 mb-1">{rel.nombre}</div>
                      <div className="text-primary font-bold text-sm mb-1">{rel.precio} Bs</div>
                      <Link to={`/tienda/${slugify(rel.nombre)}`} className="text-xs text-primary underline" aria-label={`Ver detalle de ${rel.nombre}`}>Ver detalle</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal de login/registro unificado */}
      <Modal isOpen={showAuth} onClose={() => setShowAuth(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">{showRegister ? 'Crea tu cuenta' : 'Iniciar sesión'}</h2>
        {showRegister ? (
          <UneteForm onRegister={data => {login({ email: data.email, nombre: data.nombre || data.email }); setShowAuth(false);}} onShowLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLogin={async data => {const ok = await login(data); if (ok) setShowAuth(false); return ok;}} onShowRegister={() => setShowRegister(true)} />
        )}
      </Modal>
    </div>
  );
};

export default ProductoDetalle;
