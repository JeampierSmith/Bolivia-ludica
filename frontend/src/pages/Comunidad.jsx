import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock de datos de departamentos y tiendas (ajusta paths y datos reales luego)
const departamentos = [
	{
		nombre: 'Cochabamba',
		ambiente: '/Bolivia-ludica/assets/image/ambientes/Cochabamba/Antikuna/Antikuna.webp',
		tiendas: [
			{
				nombre: 'Antikuna',
				logo: '/Bolivia-ludica/assets/image/stores/antikuna.webp',
				ciudad: 'Cochabamba',
				especialidad: 'Juegos de mesa',
				ambiente: [
					'/Bolivia-ludica/assets/image/ambientes/Cochabamba/Antikuna/Antikuna.webp',
					'/Bolivia-ludica/assets/image/ambientes/Cochabamba/Antikuna/Antikuna2.webp'
				],
			},
			{
				nombre: 'El Mercader Errante',
				logo: '/Bolivia-ludica/assets/image/stores/mercadererrante.webp',
				ciudad: 'Cochabamba',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Cochabamba/MercadoErrante/MercadoErrante.webp',
			},
			{
				nombre: 'Tinkuna Games',
				logo: '/Bolivia-ludica/assets/image/stores/tinkunagmaes.webp',
				ciudad: 'Cochabamba',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Cochabamba/Tinkunagames/TinkunaGames.webp',
			},
			{
				nombre: 'Games Landing',
				logo: '/Bolivia-ludica/assets/image/stores/gameslanding.webp',
				ciudad: 'Cochabamba',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Cochabamba/GamesLanding/GamesLanding.webp',
			},
			{
				nombre: 'Magic Games',
				logo: '/Bolivia-ludica/assets/image/stores/magicgames.webp',
				ciudad: 'Cochabamba',
				especialidad: 'Juegos de mesa',
				ambiente: [
					'/Bolivia-ludica/assets/image/ambientes/Cochabamba/MagicgGames/IMG-20241014-WA0053.webp',
					'/Bolivia-ludica/assets/image/ambientes/Cochabamba/MagicgGames/IMG-20241014-WA0054.webp'
				],
			},
		],
	},
	{
		nombre: 'La Paz',
		ambiente: '/Bolivia-ludica/assets/image/ambientes/LaPaz/GuaridadelGoblin/GuaridadelGoblin.webp',
		tiendas: [
			{
				nombre: 'Bros Game Club',
				logo: '/Bolivia-ludica/assets/image/stores/brosGame.webp',
				ciudad: 'La Paz',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/LaPaz/Bros/Bros.webp',
			},
			{
				nombre: 'Guarida del Goblin',
				logo: '/Bolivia-ludica/assets/image/stores/guaridadelgoblin.webp',
				ciudad: 'La Paz',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/LaPaz/GuaridadelGoblin/GuaridadelGoblin.webp',
			},
			{
				nombre: 'Shadow Games',
				logo: '/Bolivia-ludica/assets/image/stores/shadowgame.webp',
				ciudad: 'La Paz',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/LaPaz/ShadowGames/ShadowGames.webp',
			},
		],
	},
	{
		nombre: 'Oruro',
		ambiente: '/Bolivia-ludica/assets/image/ambientes/Oruro/CoffeArkham/CoffeArkham.webp',
		tiendas: [
			{
				nombre: 'Coffe Arkham',
				logo: '/Bolivia-ludica/assets/image/stores/coffearkham.webp',
				ciudad: 'Oruro',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Oruro/CoffeArkham/CoffeArkham.webp',
			},
			{
				nombre: 'Dados y Dragones',
				logo: '/Bolivia-ludica/assets/image/stores/dadosydragones.webp',
				ciudad: 'Oruro',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Oruro/DadosYDragones/DadosYDragones.webp',
			},
			{
				nombre: 'El baúl de los juegos',
				logo: '/Bolivia-ludica/assets/image/stores/bauldejuegos.webp',
				ciudad: 'Oruro',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Oruro/BauldelosJuegos/BauldelosJuegos.webp',
			},
			{
				nombre: 'La posada del gato',
				logo: '/Bolivia-ludica/assets/image/stores/posadadelgato.webp',
				ciudad: 'Oruro',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Oruro/PosadaDelGato/PosadaDelGato.webp',
			},
		],
	},
	{
		nombre: 'Potosí',
		ambiente: '/Bolivia-ludica/assets/image/ambientes/Potosi/LeGato/LeGato.webp',
		tiendas: [
			{
				nombre: 'Le gato',
				logo: '/Bolivia-ludica/assets/image/stores/legato.webp',
				ciudad: 'Potosí',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Potosi/LeGato/LeGato.webp',
			},
		],
	},
	{
		nombre: 'Santa Cruz',
		ambiente: '/Bolivia-ludica/assets/image/ambientes/SantaCruz/JugateEsta/JugateEsta.webp',
		tiendas: [
			{
				nombre: 'Jugate esta',
				logo: '/Bolivia-ludica/assets/image/stores/jugateesta.webp',
				ciudad: 'Santa Cruz',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/SantaCruz/JugateEsta/JugateEsta.webp',
			},
			{
				nombre: 'La Mazmorra del Juasi',
				logo: '/Bolivia-ludica/assets/image/stores/juasi.webp',
				ciudad: 'Santa Cruz',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/SantaCruz/Jausi/Jausi.webp',
			},
			{
				nombre: 'Sharks TCG',
				logo: '/Bolivia-ludica/assets/image/stores/sharkstcg.webp',
				ciudad: 'Santa Cruz',
				especialidad: 'TCG',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/SantaCruz/SharksTCG/SharksTCG.webp',
			},
			{
				nombre: 'Uruloki',
				logo: '/Bolivia-ludica/assets/image/stores/uroloki.webp',
				ciudad: 'Santa Cruz',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/SantaCruz/Uruloki/Uruloki.webp',
			},
		],
	},
	{
		nombre: 'Sucre',
		ambiente: '/Bolivia-ludica/assets/image/ambientes/Sucre/PuntoDeVictoria/PuntoDeVictoria.webp',
		tiendas: [
			{
				nombre: 'Punto de Victoria',
				logo: '/Bolivia-ludica/assets/image/stores/puntodevictoria.webp',
				ciudad: 'Sucre',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Sucre/PuntoDeVictoria/PuntoDeVictoria.webp',
			},
		],
	},
	{
		nombre: 'Tarija',
		ambiente: '/Bolivia-ludica/assets/image/ambientes/Tarija/Bazinga/Bazinga.webp',
		tiendas: [
			{
				nombre: 'Bazinga',
				logo: '/Bolivia-ludica/assets/image/stores/bazinga.webp',
				ciudad: 'Tarija',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Tarija/Bazinga/Bazinga.webp',
			},
			{
				nombre: 'Mesa Dragon',
				logo: '/Bolivia-ludica/assets/image/stores/mesadragon.webp',
				ciudad: 'Tarija',
				especialidad: 'Juegos de mesa',
				ambiente: '/Bolivia-ludica/assets/image/ambientes/Tarija/MesaDragon/MesaDragon.webp',
			},
		],
	},
];

const Comunidad = () => {
	const [modalDepto, setModalDepto] = useState(null);
	const [logoIndices, setLogoIndices] = useState(
		departamentos.map(() => 0)
	);
	const [selectedTienda, setSelectedTienda] = useState(null);
	const navigate = useNavigate();

	// Utilidad para normalizar el nombre de la tienda en la URL
	function slugify(str) {
		return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
	}

	// Efecto para rotar logos cada 5 segundos
	React.useEffect(() => {
		const interval = setInterval(() => {
			setLogoIndices(prev =>
				prev.map((idx, d) => {
					const tiendas = departamentos[d].tiendas.filter(t => t.logo);
					if (tiendas.length === 0) return 0;
					// Si el índice actual es mayor o igual al número de tiendas con logo, reiniciar a 0
					const nextIdx = (idx + 1) % tiendas.length;
					return nextIdx;
				})
			);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="py-16 min-h-[60vh] bg-gradient-to-b from-neutral-50 to-neutral-200">
			{/* HERO sección comunidad */}
			<section className="w-full bg-black py-16 mb-10">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-5xl font-extrabold mb-4 text-white drop-shadow font-[prototype]">
						Nuestra Comunidad
					</h2>
					<p className="max-w-2xl mx-auto text-center text-lg text-white/90 mb-0">
						Conoce a las tiendas y espacios que hacen posible Bolivia Lúdica en
						cada rincón del país.
					</p>
				</div>
			</section>

			<div className="max-w-6xl mx-auto px-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{departamentos.map((depto, idx) => {
						const tiendasConLogo = depto.tiendas.filter(t => t.logo);
						const currentLogo = tiendasConLogo.length > 0 ? tiendasConLogo[logoIndices[idx] % tiendasConLogo.length].logo : depto.ambiente;
						return (
							<div
								key={depto.nombre}
								className="relative rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-neutral-200"
								onClick={() => setModalDepto(idx)}
								style={{
									background: `#222 url(${currentLogo}) center/cover no-repeat`,
									minHeight: '260px',
									transition: 'background-image 0.5s ease-in-out',
								}}
							>
								<div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
								<div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-start z-10">
									<h3 className="text-2xl font-bold text-white drop-shadow mb-2">
										{depto.nombre}
									</h3>
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										{depto.tiendas.map(tienda => (
											<img
												key={tienda.nombre}
												src={tienda.logo}
												alt={tienda.nombre}
												className="w-10 h-10 object-contain bg-white rounded-full border border-neutral-200 shadow mb-1"
												onError={e => (e.target.style.opacity = 0.2)}
											/>
										))}
									</div>
									<button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-1 rounded-full shadow text-sm mt-1">
										Ver tiendas
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Modal de tiendas por departamento */}
			{modalDepto !== null && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto"
					tabIndex={-1}
					onClick={e => {
						if (e.target === e.currentTarget) setModalDepto(null);
					}}
					onKeyDown={e => {
						if (e.key === 'Escape') setModalDepto(null);
					}}
					aria-modal="true"
					role="dialog"
				>
					<div
						className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn max-h-[90vh] overflow-y-auto"
						tabIndex={0}
						onKeyDown={e => {
							if (e.key === 'Escape') setModalDepto(null);
						}}
					>
						<button
							className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-900 text-2xl font-bold"
							onClick={() => setModalDepto(null)}
							aria-label="Cerrar"
						>
							×
						</button>
						<h3 className="text-3xl font-bold mb-4 text-yellow-700">
							{departamentos[modalDepto].nombre}
						</h3>
						{/* Si hay una tienda seleccionada, mostrar detalles */}
						{selectedTienda ? (
							<div className="flex flex-col items-center gap-4">
								<button
									className="self-end text-neutral-500 hover:text-neutral-900 text-lg font-bold mb-2"
									onClick={() => setSelectedTienda(null)}
								>
									← Volver
								</button>
								<img
									src={selectedTienda.logo}
									alt={selectedTienda.nombre}
									className="w-24 h-24 object-contain bg-white rounded-full border border-neutral-200 mb-2"
									onError={e => (e.target.style.opacity = 0.2)}
								/>
								<h4 className="text-2xl font-bold text-neutral-900 mb-1">{selectedTienda.nombre}</h4>
								<span className="text-md text-neutral-600 mb-1">{selectedTienda.ciudad}</span>
								<span className="text-sm text-yellow-700 mb-2">{selectedTienda.especialidad}</span>
								<img
									src={selectedTienda.ambiente}
									alt={`Ambiente ${selectedTienda.nombre}`}
									className="w-full h-40 object-cover rounded-lg border border-neutral-200 mb-2"
									onError={e => (e.target.style.opacity = 0.2)}
								/>
								{/* Sugerencia: puedes agregar más detalles aquí, como dirección, contacto, redes sociales, horarios, etc. */}
								<p className="text-neutral-700 text-center mt-2">Próximamente más información y fotos de este espacio.</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{departamentos[modalDepto].tiendas.map(tienda => (
									<div key={tienda.nombre} className="flex flex-col items-center bg-neutral-50 rounded-xl p-4 shadow border border-neutral-200 cursor-pointer hover:bg-yellow-50 transition"
										onClick={() => navigate(`/comunidad/${slugify(tienda.nombre)}`)}
									>
										<img
											src={tienda.logo}
											alt={tienda.nombre}
											className="w-16 h-16 object-contain bg-white rounded-full border border-neutral-200 mb-2"
											onError={e => (e.target.style.opacity=0.2)}
										/>
										<h4 className="text-lg font-bold text-neutral-900 mb-1">{tienda.nombre}</h4>
										<span className="text-sm text-neutral-600 mb-1">{tienda.ciudad}</span>
										<span className="text-xs text-yellow-700 mb-2">{tienda.especialidad}</span>
										<img
											src={tienda.ambiente}
											alt={`Ambiente ${tienda.nombre}`}
											className="w-full h-20 object-cover rounded-lg border border-neutral-200"
											onError={e => (e.target.style.opacity=0.2)}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	);
};

export default Comunidad;
