import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTiendas } from '../services/tiendaService';

const Comunidad = () => {
	const [departamentos, setDepartamentos] = useState([]);
	const [modalDepto, setModalDepto] = useState(null);
	const [logoIndices, setLogoIndices] = useState([]);
	const [selectedTienda, setSelectedTienda] = useState(null);
	const navigate = useNavigate();

	// Utilidad para normalizar el nombre de la tienda en la URL
	function slugify(str) {
		return (str || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
	}

	// Agrupa tiendas por departamento
	useEffect(() => {
		getTiendas().then(tiendas => {
			const agrupadas = tiendas.reduce((acc, tienda) => {
				const depto = tienda.ubicacion || 'N/A';
				if (!acc[depto]) acc[depto] = [];
				acc[depto].push(tienda);
				return acc;
			}, {});
			const arr = Object.entries(agrupadas).map(([nombre, tiendas]) => ({ nombre, tiendas }));
			setDepartamentos(arr);
			setLogoIndices(arr.map(() => 0));
		});
	}, []);

	// Efecto para rotar logos cada 5 segundos
	useEffect(() => {
		if (departamentos.length === 0) return;
		const interval = setInterval(() => {
			setLogoIndices(prev =>
				prev.map((idx, d) => {
					const tiendas = departamentos[d].tiendas.filter(t => t.logo);
					if (tiendas.length === 0) return 0;
					const nextIdx = (idx + 1) % tiendas.length;
					return nextIdx;
				})
			);
		}, 5000);
		return () => clearInterval(interval);
	}, [departamentos]);

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
						const currentLogo = tiendasConLogo.length > 0 ? tiendasConLogo[logoIndices[idx] % tiendasConLogo.length].logo : '';
						return (
							<div
								key={depto.nombre}
								className="relative rounded-2xl shadow-lg overflow-hidden group cursor-pointer border border-neutral-200"
								onClick={() => setModalDepto(idx)}
								style={{
									background: currentLogo ? `#222 url(${currentLogo}) center/cover no-repeat` : '#222',
									minHeight: '260px',
									transition: 'background-image 0.5s ease-in-out',
								}}
							>
								<div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
								<div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-start z-10">
									<h3 className="text-2xl font-bold text-white drop-shadow mb-2">{depto.nombre}</h3>
									<div className="flex items-center gap-2 mb-2 flex-wrap">
										{depto.tiendas.map(tienda => (
											<img
												key={tienda._id}
												src={tienda.logo || ''}
												alt={tienda.nombre || 'N/A'}
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
			{modalDepto !== null && departamentos[modalDepto] && (
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
						<h3 className="text-3xl font-bold mb-4 text-yellow-700">{departamentos[modalDepto].nombre}</h3>
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
									src={selectedTienda.logo || ''}
									alt={selectedTienda.nombre || 'N/A'}
									className="w-24 h-24 object-contain bg-white rounded-full border border-neutral-200 mb-2"
									onError={e => (e.target.style.opacity = 0.2)}
								/>
								<h4 className="text-2xl font-bold text-neutral-900 mb-1">{selectedTienda.nombre || 'N/A'}</h4>
								<span className="text-md text-neutral-600 mb-1">{selectedTienda.ubicacion || 'N/A'}</span>
								<span className="text-sm text-yellow-700 mb-2">{selectedTienda.descripcion || 'N/A'}</span>
								<img
									src={Array.isArray(selectedTienda.ambiente) ? selectedTienda.ambiente[0] : selectedTienda.ambiente || ''}
									alt={`Ambiente ${selectedTienda.nombre || 'N/A'}`}
									className="w-full h-40 object-cover rounded-lg border border-neutral-200 mb-2"
									onError={e => (e.target.style.opacity = 0.2)}
								/>
								<div className="text-neutral-700 text-center mt-2">
									<p><b>Dirección:</b> {selectedTienda.direccion || 'N/A'}</p>
									<p><b>Teléfono:</b> {selectedTienda.telefono || 'N/A'}</p>
									<p><b>Correo:</b> {selectedTienda.correo || 'N/A'}</p>
									<p><b>Horarios:</b> {selectedTienda.horarios || 'N/A'}</p>
									<p><b>Facebook:</b> {selectedTienda.redesSociales?.facebook || 'N/A'}</p>
									<p><b>Instagram:</b> {selectedTienda.redesSociales?.instagram || 'N/A'}</p>
									<p><b>TikTok:</b> {selectedTienda.tiktok || 'N/A'}</p>
								</div>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{departamentos[modalDepto].tiendas.map(tienda => (
									<div key={tienda._id} className="flex flex-col items-center bg-neutral-50 rounded-xl p-4 shadow border border-neutral-200 cursor-pointer hover:bg-yellow-50 transition"
										onClick={() => {
											navigate(`/comunidad/${slugify(tienda.nombre)}`);
										}}
									>
										<img
											src={tienda.logo || ''}
											alt={tienda.nombre || 'N/A'}
											className="w-16 h-16 object-contain bg-white rounded-full border border-neutral-200 mb-2"
											onError={e => (e.target.style.opacity=0.2)}
										/>
										<h4 className="text-lg font-bold text-neutral-900 mb-1">{tienda.nombre || 'N/A'}</h4>
										<span className="text-sm text-neutral-600 mb-1">{tienda.ubicacion || 'N/A'}</span>
										<span className="text-xs text-yellow-700 mb-2">{tienda.descripcion || 'N/A'}</span>
										<img
											src={Array.isArray(tienda.ambiente) ? tienda.ambiente[0] : tienda.ambiente || ''}
											alt={`Ambiente ${tienda.nombre || 'N/A'}`}
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
