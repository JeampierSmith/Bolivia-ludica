import React, { useState } from 'react';
import { FaCrown, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const playerRanking = [
	{
		name: 'Carlos Mendoza',
		points: 1250,
		games: 48,
		winRate: 78,
		level: 'Experto',
		location: 'La Paz',
		trend: 3,
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
		pro: true,
	},
	{
		name: 'Laura Sánchez',
		points: 1180,
		games: 44,
		winRate: 72,
		level: 'Avanzado',
		location: 'Cochabamba',
		trend: 1,
		avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
		pro: false,
	},
	{
		name: 'Miguel Ángel Torres',
		points: 1050,
		games: 40,
		winRate: 65,
		level: 'Intermedio',
		location: 'Santa Cruz',
		trend: -2,
		avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
		pro: false,
	},
	{
		name: 'Ana Torres',
		points: 900,
		games: 35,
		winRate: 60,
		level: 'Intermedio',
		location: 'Oruro',
		trend: 0,
		avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
		pro: false,
	},
	{
		name: 'Luis Rojas',
		points: 850,
		games: 30,
		winRate: 55,
		level: 'Principiante',
		location: 'Tarija',
		trend: 0,
		avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
		pro: false,
	},
];

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
						alt={player.name}
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
				<span className="text-neutral-400 text-sm">
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
					.filter((player) => player.name.toLowerCase().includes(search.toLowerCase()))
					.map((player, idx) => (
						<tr
							key={player.name}
							className="border-b border-neutral-200 hover:bg-neutral-100 transition-colors group"
						>
							<td className="py-2 px-2 font-semibold text-center text-black">
								{idx + 1}
							</td>
							<td className="py-2 px-2 flex items-center gap-2">
								<img
									src={player.avatar}
									alt={player.name}
									className="w-8 h-8 rounded-full border-2 border-black group-hover:ring-2 group-hover:ring-black transition"
								/>
								<span className="font-medium text-black">{player.name}</span>
								{player.pro && (
									<span className="ml-2 px-2 py-0.5 text-xs bg-black text-white rounded">
										PRO
									</span>
								)}
							</td>
							<td className="py-2 px-2 text-black">{player.points}</td>
							<td className="py-2 px-2 text-black">{player.games}</td>
							<td className="py-2 px-2">
								<span className="inline-block px-2 py-0.5 rounded bg-black text-white font-semibold text-xs">
									{player.winRate}%
								</span>
							</td>
							<td className="py-2 px-2">
								<span
									className={`px-2 py-0.5 rounded text-xs font-bold ${
										player.level === 'Experto'
											? 'bg-black text-white'
											: 'bg-neutral-200 text-black'
									}`}
								>
									{player.level}
								</span>
							</td>
							<td className="py-2 px-2 text-black">{player.location}</td>
							<td className="py-2 px-2">
								{player.trend > 0 && (
									<span className="flex items-center text-green-600 font-bold">
										<FaArrowUp className="mr-1 animate-bounce" />
										+{player.trend}
									</span>
								)}
								{player.trend < 0 && (
									<span className="flex items-center text-red-600 font-bold">
										<FaArrowDown className="mr-1 animate-bounce" />
										{player.trend}
									</span>
								)}
								{player.trend === 0 && (
									<span className="text-neutral-400">-</span>
								)}
							</td>
						</tr>
					))}
			</tbody>
		</table>
		{data.filter((player) => player.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
			<div className="text-center text-neutral-400 py-8 bg-white">
				No se encontraron jugadores.
			</div>
		)}
	</div>
);

const levels = [
	'Todos',
	...Array.from(new Set(playerRanking.map((p) => p.level))),
];
const locations = [
	'Todos',
	...Array.from(new Set(playerRanking.map((p) => p.location))),
];
const minPoints = Math.min(...playerRanking.map((p) => p.points));
const maxPoints = Math.max(...playerRanking.map((p) => p.points));

const PAGE_SIZE = 3;

const Ranking = () => {
	const [search, setSearch] = useState('');
	const [level, setLevel] = useState('Todos');
	const [location, setLocation] = useState('Todos');
	const [pointsRange, setPointsRange] = useState([minPoints, maxPoints]);
	const [page, setPage] = useState(1);

	// Filtrado avanzado
	const filtered = playerRanking.filter((player) => {
		const matchesSearch = player.name
			.toLowerCase()
			.includes(search.toLowerCase());
		const matchesLevel = level === 'Todos' || player.level === level;
		const matchesLocation = location === 'Todos' || player.location === location;
		const matchesPoints =
			player.points >= pointsRange[0] && player.points <= pointsRange[1];
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
				<Podium players={[playerRanking[1], playerRanking[0], playerRanking[2]]} />
				<StatsCards stats={stats} />
				{/* Filtros avanzados */}
				<div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
						<input
							type="text"
							placeholder="Buscar jugador..."
							value={search}
							onChange={handleSearch}
							className="border border-neutral-300 bg-white text-black rounded-lg px-4 py-2 w-full sm:w-56 focus:outline-none focus:border-black shadow-sm transition placeholder:text-neutral-400"
						/>
						<select
							value={level}
							onChange={handleLevel}
							className="border border-neutral-300 bg-white text-black rounded-lg px-3 py-2 focus:outline-none focus:border-black shadow-sm"
						>
							{levels.map((lvl) => (
								<option key={lvl}>{lvl}</option>
							))}
						</select>
						<select
							value={location}
							onChange={handleLocation}
							className="border border-neutral-300 bg-white text-black rounded-lg px-3 py-2 focus:outline-none focus:border-black shadow-sm"
						>
							{locations.map((loc) => (
								<option key={loc}>{loc}</option>
							))}
						</select>
						<div className="flex items-center gap-1">
							<input
								type="number"
								min={minPoints}
								max={pointsRange[1]}
								value={pointsRange[0]}
								onChange={(e) => handlePointsChange(e, 0)}
								className="w-16 border border-neutral-300 bg-white text-black rounded px-2 py-1 text-sm focus:outline-none"
							/>
							<span className="text-neutral-400">-</span>
							<input
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
				<RankingTable data={paginated} search={''} />
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
