import React, { useState, useEffect } from 'react';
import { FaCrown, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { getRanking } from '../services/api';

const stats = [
	{ label: 'Jugadores clasificados', value: 12 },
	{ label: 'Partidas jugadas', value: 382 },
	{ label: 'Rating promedio', value: 828 },
];

const Podium = ({ players }) => (
	<div className="flex flex-col sm:flex-row justify-center items-end gap-8 mb-10">
		{players.map((player, idx) => (
			<div
				key={player.name}
				className={`relative flex flex-col items-center transition-transform duration-300 ${
					idx === 1 ? 'z-10 scale-110' : 'z-0 scale-100'
				} group`}
			>
				<div
					className={`relative w-24 h-24 rounded-full border-4 ${
						idx === 1 ? 'border-black' : 'border-neutral-900'
					} overflow-hidden bg-black shadow-xl group-hover:scale-105 transition-transform duration-300 mb-2`}
				>
					<img
						src={player.avatar}
						alt={`Avatar de ${player.name}`}
						className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition"
					/>
					{idx === 1 && (
						<FaCrown className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-3xl drop-shadow animate-bounce" />
					)}
				</div>
				<span
					className={`text-lg font-bold ${
						idx === 1 ? 'text-black' : 'text-neutral-900'
					} group-hover:text-black transition-colors`}
				>
					{player.name}
				</span>
				<span className="text-neutral-700 text-sm">
					{player.points} pts
				</span>
				<span
					className={`absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-lg shadow ${
						idx === 1
							? 'bg-black'
							: idx === 0
							? 'bg-neutral-900'
							: 'bg-neutral-700'
					}`}
				>
					{idx === 1 ? 1 : idx === 0 ? 2 : 3}
				</span>
			</div>
		))}
	</div>
);

const StatsCards = ({ stats }) => (
	<div className="flex flex-wrap justify-center gap-6 mb-8">
		{stats.map((stat) => (
			<div
				key={stat.label}
				className="bg-black border border-neutral-900 rounded-xl shadow-lg p-6 min-w-[180px] text-center hover:shadow-2xl transition-shadow duration-300"
			>
				<div className="text-3xl font-extrabold text-white mb-1 animate-fade-in">
					{stat.value}
				</div>
				<div className="text-neutral-300 text-sm">{stat.label}</div>
			</div>
		))}
	</div>
);

const RankingTable = ({ data, search }) => (
	<div className="overflow-x-auto w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200">
		<table className="w-full text-left">
			<thead>
				<tr className="border-b border-neutral-200 bg-neutral-50">
					<th className="py-3 px-2 text-black">Pos</th>
					<th className="py-3 px-2 text-black">Jugador</th>
					<th className="py-3 px-2 text-black">Puntos</th>
					<th className="py-3 px-2 text-black">Partidas</th>
					<th className="py-3 px-2 text-black">% Victoria</th>
					<th className="py-3 px-2 text-black">Nivel</th>
					<th className="py-3 px-2 text-black">Ubicación</th>
					<th className="py-3 px-2 text-black">Tendencia</th>
				</tr>
			</thead>
			<tbody>
				{data
					.filter((player) => player.jugador.toLowerCase().includes(search.toLowerCase()))
					.map((player, idx) => {
						let posBg = '';
						let posIcon = null;
						if (player.posicion === 1) {
							posBg = 'bg-yellow-300 text-yellow-900 font-bold';
							posIcon = <span title="Oro" className="mr-1">🥇</span>;
						} else if (player.posicion === 2) {
							posBg = 'bg-gray-300 text-gray-800 font-bold';
							posIcon = <span title="Plata" className="mr-1">🥈</span>;
						} else if (player.posicion === 3) {
							posBg = 'bg-amber-700 text-white font-bold';
							posIcon = <span title="Bronce" className="mr-1">🥉</span>;
						}
						return (
							<tr key={player._id} className="border-b border-neutral-200 hover:bg-neutral-100 transition-colors group">
								<td className={`py-2 px-2 font-semibold text-center ${posBg}`}>{posIcon}{player.posicion}</td>
								<td className="py-2 px-2 flex items-center gap-2">
									<img
										src={player.avatar}
										alt={`Avatar de ${player.jugador}`}
										className="w-8 h-8 rounded-full border-2 border-black group-hover:ring-2 group-hover:ring-black transition"
									/>
									<span className="font-medium text-black">{player.jugador}</span>
								</td>
								<td className="py-2 px-2 text-black">{player.puntos}</td>
								<td className="py-2 px-2 text-black">{player.partidasJugadas}</td>
								<td className="py-2 px-2">
									<span className="inline-block px-2 py-0.5 rounded bg-black text-white font-semibold text-xs">
										{player.porcentajeVictoria}%
									</span>
								</td>
								<td className="py-2 px-2">
									<span className={`px-2 py-0.5 rounded text-xs font-bold ${player.nivel === 'Experto' ? 'bg-black text-white' : 'bg-neutral-200 text-black'}`}>{player.nivel}</span>
								</td>
								<td className="py-2 px-2 text-black">{player.ciudad}</td>
								<td className="py-2 px-2">
									{player.tendencia > 0 && (
										<span className="flex items-center text-green-900 font-bold">
											<FaArrowUp className="mr-1 animate-bounce" />+{player.tendencia}
										</span>
									)}
									{player.tendencia < 0 && (
										<span className="flex items-center text-red-700 font-bold">
											<FaArrowDown className="mr-1 animate-bounce" />{player.tendencia}
										</span>
									)}
									{player.tendencia === 0 && (
										<span className="text-neutral-600">-</span>
									)}
								</td>
							</tr>
						);
					})}
			</tbody>
		</table>
		{data.filter((player) => player.jugador.toLowerCase().includes(search.toLowerCase())).length === 0 && (
			<div className="text-center text-neutral-600 py-8 bg-white">
				No se encontraron jugadores.
			</div>
		)}
	</div>
);

const PAGE_SIZE = 10;

const Ranking = () => {
	const [search, setSearch] = useState('');
	const [level, setLevel] = useState('Todos');
	const [location, setLocation] = useState('Todos');
	const [pointsRange, setPointsRange] = useState([0, 0]);
	const [page, setPage] = useState(1);
	const [players, setPlayers] = useState([]);
	const [loading, setLoading] = useState(true);

	// Mueve aquí las variables dependientes de players
	const levels = [
		'Todos',
		...Array.from(new Set(players.map((p) => p.nivel))),
	];
	const locations = [
		'Todos',
		...Array.from(new Set(players.map((p) => p.ciudad))),
	];
	const minPoints = players.length > 0 ? Math.min(...players.map((p) => p.puntos)) : 0;
	const maxPoints = players.length > 0 ? Math.max(...players.map((p) => p.puntos)) : 0;

	useEffect(() => {
		setLoading(true);
		getRanking()
			.then(data => {
				setPlayers(data);
				if (data.length > 0) {
					const min = Math.min(...data.map(p => p.puntos));
					const max = Math.max(...data.map(p => p.puntos));
					setPointsRange([min, max]);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	// Filtrado avanzado
	const filtered = players.filter((player) => {
		const matchesSearch = player.jugador
			.toLowerCase()
			.includes(search.toLowerCase());
		const matchesLevel = level === 'Todos' || player.nivel === level;
		const matchesLocation = location === 'Todos' || player.ciudad === location;
		const matchesPoints =
			player.puntos >= pointsRange[0] && player.puntos <= pointsRange[1];
		return (
			matchesSearch && matchesLevel && matchesLocation && matchesPoints
		);
	});

	// Paginación
	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	// Handlers
	const handlePointsChange = (e, idx) => {
		const val = Number(e.target.value);
		setPointsRange((prev) =>
			idx === 0 ? [val, prev[1]] : [prev[0], val]
		);
		setPage(1);
	};
	const handleLevel = (e) => {
		setLevel(e.target.value);
		setPage(1);
	};
	const handleLocation = (e) => {
		setLocation(e.target.value);
		setPage(1);
	};
	const handleSearch = (e) => {
		setSearch(e.target.value);
		setPage(1);
	};

	return (
		<section className="py-0 min-h-[60vh] flex flex-col items-center bg-white">
			{/* Cabecera negra con título y descripción */}
			<div className="w-full bg-black py-10 px-2 sm:px-0 mb-8">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-4xl font-extrabold mb-2 text-white drop-shadow tracking-tight">
						Ranking de Jugadores
					</h2>
					<p className="max-w-2xl text-left text-lg text-neutral-200 mb-0">
						Descubre a los mejores jugadores. Compite en torneos oficiales para
						subir en la clasificación y demostrar tus habilidades.
					</p>
				</div>
			</div>
			<div className="w-full max-w-5xl mx-auto px-2 sm:px-0">
				{/* Renderizar Podium solo si hay al menos 3 jugadores */}
				{players && players.length >= 3 && (
					<Podium players={[players[1], players[0], players[2]].filter(Boolean)} />
				)}
				<StatsCards stats={stats} />
				{/* Filtros avanzados */}
				<div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
						<label htmlFor="search-player" className="sr-only">Buscar jugador</label>
						<input
							id="search-player"
							type="text"
							placeholder="Buscar jugador..."
							value={search}
							onChange={handleSearch}
							className="border border-neutral-300 bg-white text-black rounded-lg px-4 py-2 w-full sm:w-56 focus:outline-none focus:border-black shadow-sm transition placeholder:text-neutral-500"
						/>
						<label htmlFor="level-select" className="sr-only">Filtrar por nivel</label>
						<select
							id="level-select"
							value={level}
							onChange={handleLevel}
							className="border border-neutral-300 bg-white text-black rounded-lg px-3 py-2 focus:outline-none focus:border-black shadow-sm"
						>
							{levels.map((lvl) => (
								<option key={lvl}>{lvl}</option>
							))}
						</select>
						<label htmlFor="location-select" className="sr-only">Filtrar por ubicación</label>
						<select
							id="location-select"
							value={location}
							onChange={handleLocation}
							className="border border-neutral-300 bg-white text-black rounded-lg px-3 py-2 focus:outline-none focus:border-black shadow-sm"
						>
							{locations.map((loc) => (
								<option key={loc}>{loc}</option>
							))}
						</select>
						<div className="flex items-center gap-1">
							<label htmlFor="min-points" className="sr-only">Puntos mínimos</label>
							<input
								id="min-points"
								type="number"
								min={minPoints}
								max={pointsRange[1]}
								value={pointsRange[0]}
								onChange={(e) => handlePointsChange(e, 0)}
								className="w-16 border border-neutral-300 bg-white text-black rounded px-2 py-1 text-sm focus:outline-none"
							/>
							<span className="text-neutral-600">-</span>
							<label htmlFor="max-points" className="sr-only">Puntos máximos</label>
							<input
								id="max-points"
								type="number"
								min={pointsRange[0]}
								max={maxPoints}
								value={pointsRange[1]}
								onChange={(e) => handlePointsChange(e, 1)}
								className="w-16 border border-neutral-300 bg-white text-black rounded px-2 py-1 text-sm focus:outline-none"
							/>
						</div>
					</div>
				</div>
				<RankingTable data={paginated} search={search} />
				{/* Paginación */}
				<div className="flex justify-center items-center gap-2 mt-6">
					<button
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page === 1}
						className={`px-3 py-1 rounded border border-neutral-300 bg-white text-black font-medium transition hover:bg-black hover:text-white disabled:opacity-40`}
					>
						Anterior
					</button>
					<span className="px-2 text-black">
						Página {page} de {totalPages || 1}
					</span>
					<button
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={page === totalPages || totalPages === 0}
						className={`px-3 py-1 rounded border border-neutral-300 bg-white text-black font-medium transition hover:bg-black hover:text-white disabled:opacity-40`}
					>
						Siguiente
					</button>
				</div>
			</div>
		</section>
	);
};

export default Ranking;
