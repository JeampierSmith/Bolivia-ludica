import React, { useState } from 'react';
import Header from '../components/layout/Header/Header';

const heroBg = '/Bolivia-ludica/assets/image/catan/solo figura-blanco.png';

// Mock data for sections (replace with real data as needed)
const departamentos = [
  { nombre: 'Sucre', reps: 2 },
  { nombre: 'Potosí', reps: 2 },
  { nombre: 'Oruro', reps: 4 },
  { nombre: 'Tarija', reps: 4 },
  { nombre: 'La Paz', reps: 8 },
  { nombre: 'Santa Cruz', reps: 8 },
  { nombre: 'Cochabamba', reps: 8 },
];
const premios = [
  { puesto: 1, premio: 'Juego de mesa premium + Trofeo + Kit de sorpresas' },
  { puesto: 2, premio: 'Juego de mesa + Medalla + Kit de sorpresas' },
  { puesto: 3, premio: 'Medalla + Kit de sorpresas' },
  { puesto: 4, premio: 'Kit de sorpresas' },
];
const emprendedores = [
  { nombre: 'Antikuna', img: '/Bolivia-ludica/assets/image/stores/antikuna.png' },
  { nombre: 'Baúl de Juegos', img: '/Bolivia-ludica/assets/image/stores/bauldejuegos.jpg' },
  { nombre: 'Bazinga', img: '/Bolivia-ludica/assets/image/stores/bazinga.jpg' },
  { nombre: 'BrosGame', img: '/Bolivia-ludica/assets/image/stores/brosGame.png' },
  { nombre: 'Caja de Juegos', img: '/Bolivia-ludica/assets/image/stores/cajadejuegos.jpg' },
  { nombre: 'Dados y Dragones', img: '/Bolivia-ludica/assets/image/stores/dadosydragones.jpg' },
  { nombre: 'Guarida del Goblin', img: '/Bolivia-ludica/assets/image/stores/guarida del goblin.png' },
  { nombre: 'Jugate Esta', img: '/Bolivia-ludica/assets/image/stores/jugateesta.jpg' },
  { nombre: 'Legato', img: '/Bolivia-ludica/assets/image/stores/legato.jpg' },
  { nombre: 'Magic Games', img: '/Bolivia-ludica/assets/image/stores/magicgames.jpg' },
  { nombre: 'Mercader Errante', img: '/Bolivia-ludica/assets/image/stores/mercadererrante.jpg' },
  { nombre: 'Mesa Dragón', img: '/Bolivia-ludica/assets/image/stores/mesadragon.jpg' },
  { nombre: 'MiniToys', img: '/Bolivia-ludica/assets/image/stores/minitoys.jpg' },
  { nombre: 'Punto de Victoria', img: '/Bolivia-ludica/assets/image/stores/puntodevictoria.jpg' },
  { nombre: 'Shadow Game', img: '/Bolivia-ludica/assets/image/stores/shadowgame.jpg' },
  { nombre: 'Sharks TCG', img: '/Bolivia-ludica/assets/image/stores/sharkstcg.jpg' },
  { nombre: 'Tinkuna Gmaes', img: '/Bolivia-ludica/assets/image/stores/tinkunagmaes.png' },
  { nombre: 'Uroloki', img: '/Bolivia-ludica/assets/image/stores/uroloki.jpg' },
];
const foodtrucks = [
  { nombre: 'Food Truck 1', tipo: 'Hamburguesas', iconos: ['🍔', '🥤'] },
  { nombre: 'Food Truck 2', tipo: 'Vegano', iconos: ['🥗', '🌱'] },
  { nombre: 'Food Truck 3', tipo: 'Postres', iconos: ['🍰', '🍦'] },
  { nombre: 'Food Truck 4', tipo: 'Comida rápida', iconos: ['🍟', '🌭'] },
];
const actividades = [
  { nombre: 'Talleres de diseño', icon: '🎲' },
  { nombre: 'Charlas inspiradoras', icon: '💡' },
  { nombre: 'Playtesting', icon: '🧩' },
  { nombre: 'Game jams', icon: '⚡' },
  { nombre: 'Networking', icon: '🤝' },
];

const BoliviaPlay = () => {
  const [modalEmprendedor, setModalEmprendedor] = useState(null);
  const [modalFood, setModalFood] = useState(null);
  const [showInscripcion, setShowInscripcion] = useState(false);
  const [form, setForm] = useState({ categoria: '', nombre: '', nitci: '', celular: '', email: '', mensaje: '' });
  const [formError, setFormError] = useState({});
  const formRef = React.useRef(null);

  // Carousel helpers
  const [emprStart, setEmprStart] = useState(0);
  const emprPerView = 5;
  const emprTotal = emprendedores.length;
  const nextEmpr = () => setEmprStart((prev) => (prev + emprPerView) % emprTotal);
  const prevEmpr = () => setEmprStart((prev) => (prev - emprPerView + emprTotal) % emprTotal);

  const [foodStart, setFoodStart] = useState(0);
  const foodPerView = 3;
  const foodTotal = foodtrucks.length;
  const nextFood = () => setFoodStart((prev) => (prev + foodPerView) % foodTotal);
  const prevFood = () => setFoodStart((prev) => (prev - foodPerView + foodTotal) % foodTotal);

  // Modal accesibilidad: cerrar con ESC/clic fuera, foco automático
  React.useEffect(() => {
    if (!showInscripcion) return;
    const handleKey = (e) => { if (e.key === 'Escape') setShowInscripcion(false); };
    document.addEventListener('keydown', handleKey);
    if (formRef.current) formRef.current.querySelector('select, input, textarea')?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [showInscripcion]);

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: '' });
  };
  const validateForm = () => {
    const err = {};
    if (!form.categoria) err.categoria = 'Selecciona una categoría';
    if (!form.nombre) err.nombre = 'Campo requerido';
    if (!form.nitci) err.nitci = 'Campo requerido';
    if (!form.celular || !/^\d{7,15}$/.test(form.celular)) err.celular = 'Número inválido';
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Correo inválido';
    return err;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const err = validateForm();
    if (Object.keys(err).length) { setFormError(err); return; }
    // Aquí podrías enviar el formulario
    setShowInscripcion(false);
    alert('¡Inscripción enviada!');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* NAVBAR */}
      <Header />

      {/* HERO */}
      <section
        className="w-full h-[65vh] flex flex-col justify-center items-center relative bg-black"
        style={{ background: `url(${heroBg}) center/cover no-repeat` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <img 
            src="/Bolivia-ludica/assets/image/catan/logo-blanco.png" 
            alt="Bolivia Juega Logo" 
            className="w-64 mb-6 drop-shadow-lg"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4 text-center">
            ¡Bienvenidos a Bolivia Juega!
          </h1>
          <p className="text-lg md:text-2xl text-white mb-6 text-center max-w-2xl">
            Un festival nacional para los amantes de los juegos de mesa, la creatividad y la comunidad lúdica.
          </p>
          <a href="#catan" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full shadow-lg transition text-lg">Saber más</a>
        </div>
      </section>

      {/* 1era Sección: CATAN DEL VALLE */}
      <section id="catan" className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-700 mb-2 text-center">CATAN DEL VALLE</h2>
          <p className="text-lg text-neutral-700 mb-8 text-center">Campeonato Nacional de CATAN · 36 representantes de todo el país</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl p-5 text-center shadow border border-yellow-100">
              <span className="block text-neutral-700 font-semibold text-lg mb-1">Sucre</span>
              <span className="block text-3xl font-bold text-yellow-600">2</span>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow border border-yellow-100">
              <span className="block text-neutral-700 font-semibold text-lg mb-1">Potosí</span>
              <span className="block text-3xl font-bold text-yellow-600">2</span>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow border border-yellow-100">
              <span className="block text-neutral-700 font-semibold text-lg mb-1">Oruro</span>
              <span className="block text-3xl font-bold text-yellow-600">4</span>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow border border-yellow-100">
              <span className="block text-neutral-700 font-semibold text-lg mb-1">Tarija</span>
              <span className="block text-3xl font-bold text-yellow-600">4</span>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow border border-yellow-100">
              <span className="block text-neutral-700 font-semibold text-lg mb-1">La Paz</span>
              <span className="block text-3xl font-bold text-yellow-600">8</span>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow border border-yellow-100">
              <span className="block text-neutral-700 font-semibold text-lg mb-1">Santa Cruz</span>
              <span className="block text-3xl font-bold text-yellow-600">8</span>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow border border-yellow-100">
              <span className="block text-neutral-700 font-semibold text-lg mb-1">Cochabamba</span>
              <span className="block text-3xl font-bold text-yellow-600">8</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded-lg shadow w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-yellow-700 mb-2 text-center md:text-left">Premios TOP 4</h3>
              <ul className="list-disc pl-6 text-neutral-700">
                <li>Premios exclusivos para los 4 mejores jugadores</li>
                <li>Reconocimiento nacional</li>
                <li>Kit de juegos y sorpresas</li>
              </ul>
            </div>
            <div className="flex flex-col items-center w-full md:w-1/2">
              <img src="/Bolivia-ludica/assets/image/catan/podio.png" alt="Podio CATAN" className="w-40 mb-2" onError={e => e.target.style.display='none'} />
              <span className="text-neutral-500 text-sm">Visualización del podio</span>
            </div>
          </div>
          <div className="flex justify-center">
            <a href="#" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full shadow transition">Ver detalles / Resultados</a>
          </div>
        </div>
      </section>

      {/* 2da Sección: Paseo del Emprendedor (por implementar) */}
      <section id="emprendedor" className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">Paseo del Emprendedor</h2>
          <p className="text-lg text-neutral-700 mb-8">Feria de emprendimientos lúdicos: productos, juegos, accesorios y creatividad nacional.</p>
          <div className="relative">
            <button onClick={prevEmpr} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-yellow-100">&#8592;</button>
            <div className="flex gap-6 overflow-x-auto scrollbar-hide px-12">
              {emprendedores.slice(emprStart, emprStart + emprPerView).concat(
                emprStart + emprPerView > emprTotal ? emprendedores.slice(0, (emprStart + emprPerView) % emprTotal) : []
              ).map((e, idx) => (
                <div
                  key={e.nombre}
                  className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 hover:bg-yellow-50 transition relative min-w-[160px] max-w-[180px]"
                  onClick={() => setModalEmprendedor(e)}
                >
                  <img src={e.img} alt={e.nombre} className="w-24 h-24 object-contain mb-2 rounded" onError={ev => ev.target.style.display='none'} />
                  <span className="font-bold text-neutral-800 text-center">{e.nombre}</span>
                </div>
              ))}
            </div>
            <button onClick={nextEmpr} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-yellow-100">&#8594;</button>
          </div>
          {modalEmprendedor && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full relative">
                <button className="absolute top-2 right-2 text-2xl" onClick={() => setModalEmprendedor(null)}>&times;</button>
                <img src={modalEmprendedor.img} alt={modalEmprendedor.nombre} className="w-32 h-32 object-contain mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2 text-center">{modalEmprendedor.nombre}</h4>
                <p className="text-neutral-600 text-center">Próximamente más información sobre este emprendimiento.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3era Sección: Gastro Hub (por implementar) */}
      <section id="gastro" className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Gastro Hub</h2>
          <p className="text-lg text-neutral-200 mb-8">Zona de Food Trucks: variedad gastronómica para todos los gustos.</p>
          <div className="relative">
            <button onClick={prevFood} className="absolute left-0 top-1/2 -translate-y-1/2 bg-neutral-800 border border-neutral-600 rounded-full shadow p-2 z-10 text-white hover:bg-yellow-400 hover:text-black">&#8592;</button>
            <div className="flex gap-8 overflow-x-auto scrollbar-hide px-12">
              {foodtrucks.slice(foodStart, foodStart + foodPerView).concat(
                foodStart + foodPerView > foodTotal ? foodtrucks.slice(0, (foodStart + foodPerView) % foodTotal) : []
              ).map((f, idx) => (
                <div
                  key={f.nombre}
                  className="bg-neutral-800 border border-neutral-600 rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[220px] max-w-[240px] hover:scale-105 hover:bg-yellow-900/20 transition cursor-pointer"
                  onClick={() => setModalFood(f)}
                >
                  <span className="text-4xl mb-2">{f.iconos[0]}</span>
                  <span className="font-bold text-white text-lg mb-1">{f.nombre}</span>
                  <span className="text-neutral-300 mb-2">{f.tipo}</span>
                  <div className="flex gap-2 text-2xl">
                    {f.iconos.map((ic, i) => <span key={i}>{ic}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextFood} className="absolute right-0 top-1/2 -translate-y-1/2 bg-neutral-800 border border-neutral-600 rounded-full shadow p-2 z-10 text-white hover:bg-yellow-400 hover:text-black">&#8594;</button>
          </div>
          {modalFood && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-neutral-900 rounded-xl p-8 shadow-lg max-w-md w-full relative">
                <button className="absolute top-2 right-2 text-2xl text-white" onClick={() => setModalFood(null)}>&times;</button>
                <span className="text-5xl block text-center mb-4">{modalFood.iconos[0]}</span>
                <h4 className="text-xl font-bold mb-2 text-white text-center">{modalFood.nombre}</h4>
                <p className="text-neutral-300 text-center mb-2">{modalFood.tipo}</p>
                <div className="flex gap-2 justify-center text-2xl mb-4">
                  {modalFood.iconos.map((ic, i) => <span key={i}>{ic}</span>)}
                </div>
                <p className="text-neutral-400 text-center">Próximamente menú y detalles.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4ta Sección: La Mesa Creativa (por implementar) */}
      <section id="mesa-creativa" className="py-20 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">La Mesa Creativa</h2>
          <p className="text-lg text-neutral-700 mb-2 font-semibold">Diseña, aprende, crea y juega</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            {actividades.map((a) => (
              <div key={a.nombre} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:bg-yellow-50 transition cursor-pointer animate-fade-in">
                <span className="text-4xl mb-2">{a.icon}</span>
                <span className="font-bold text-neutral-800 text-center">{a.nombre}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <a href="#" className="bg-black hover:bg-neutral-800 text-white font-bold px-6 py-2 rounded-full shadow transition">Ver cronograma</a>
          </div>
        </div>
      </section>

      {/* Sección final: Llamado a la acción (por implementar) */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">¿Quieres participar en el próximo Bolivia Juega?</h2>
          <p className="text-lg text-neutral-800 mb-6">Inscríbete como tienda, expositor o jugador y sé parte de la comunidad lúdica más grande del país.</p>
          <button
            className="bg-black hover:bg-neutral-900 text-yellow-300 font-bold px-8 py-3 rounded-full shadow-lg transition text-lg"
            onClick={() => setShowInscripcion(true)}
            aria-haspopup="dialog"
            aria-controls="modal-inscripcion"
          >
            Inscribirse
          </button>
        </div>
        {showInscripcion && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn"
            onClick={e => { if (e.target === e.currentTarget) setShowInscripcion(false); }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            id="modal-inscripcion"
          >
            <form
              ref={formRef}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative flex flex-col gap-4"
              onSubmit={handleSubmit}
              tabIndex={-1}
            >
              <button
                type="button"
                className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-900 text-2xl font-bold bg-white/80 rounded-full px-2 z-10"
                onClick={() => setShowInscripcion(false)}
                aria-label="Cerrar"
              >×</button>
              <div className="mb-2 text-center">
                <img src="/Bolivia-ludica/assets/image/catan/logo-blanco.png" alt="Bolivia Juega Logo" className="w-20 mx-auto mb-2" />
                <h3 id="modal-title" className="text-2xl font-bold text-yellow-700 mb-1">Inscripción a Bolivia Juega 2025</h3>
                <p className="text-neutral-700 text-sm">Selecciona tu categoría e ingresa tus datos.</p>
              </div>
              <label className="font-semibold text-neutral-800">Categoría
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleFormChange}
                  className={`mt-1 block w-full rounded border px-3 py-2 ${formError.categoria ? 'border-red-500' : 'border-neutral-300'}`}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="emprendimiento">Emprendimiento</option>
                  <option value="expositor">Expositor</option>
                  <option value="jugador">Jugador</option>
                </select>
                {formError.categoria && <span className="text-red-500 text-xs">{formError.categoria}</span>}
              </label>
              <label className="font-semibold text-neutral-800">Nombre Completo del Representante
                <input
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleFormChange}
                  className={`mt-1 block w-full rounded border px-3 py-2 ${formError.nombre ? 'border-red-500' : 'border-neutral-300'}`}
                  required
                />
                {formError.nombre && <span className="text-red-500 text-xs">{formError.nombre}</span>}
              </label>
              <label className="font-semibold text-neutral-800">NIT/CI
                <input
                  name="nitci"
                  type="text"
                  value={form.nitci}
                  onChange={handleFormChange}
                  className={`mt-1 block w-full rounded border px-3 py-2 ${formError.nitci ? 'border-red-500' : 'border-neutral-300'}`}
                  required
                />
                {formError.nitci && <span className="text-red-500 text-xs">{formError.nitci}</span>}
              </label>
              <label className="font-semibold text-neutral-800">Número de Celular
                <input
                  name="celular"
                  type="tel"
                  value={form.celular}
                  onChange={handleFormChange}
                  className={`mt-1 block w-full rounded border px-3 py-2 ${formError.celular ? 'border-red-500' : 'border-neutral-300'}`}
                  required
                  pattern="\d{7,15}"
                />
                {formError.celular && <span className="text-red-500 text-xs">{formError.celular}</span>}
              </label>
              <label className="font-semibold text-neutral-800">Correo electrónico
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className={`mt-1 block w-full rounded border px-3 py-2 ${formError.email ? 'border-red-500' : 'border-neutral-300'}`}
                  required
                />
                {formError.email && <span className="text-red-500 text-xs">{formError.email}</span>}
              </label>
              <label className="font-semibold text-neutral-800">Preguntas, sugerencias o mensajes
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded border border-neutral-300 px-3 py-2 min-h-[60px]"
                  placeholder="Escribe aquí tus preguntas o sugerencias..."
                  rows={3}
                />
              </label>
              <button
                type="submit"
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full shadow transition text-lg"
              >Enviar inscripción</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default BoliviaPlay;
