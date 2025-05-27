import React from 'react';

const Ranking = () => (
  <section className="py-16 min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-200">
    <h2 className="text-4xl font-extrabold mb-4 text-neutral-900 drop-shadow">Ranking</h2>
    <p className="max-w-2xl text-center text-lg text-neutral-700 mb-8">
      Consulta el ranking de jugadores y clubes de Bolivia. ¡Compite, suma puntos y alcanza los primeros lugares en la comunidad lúdica nacional!
    </p>
    <div className="flex flex-wrap gap-6 justify-center">
      <span className="bg-neutral-900 text-white px-6 py-2 rounded shadow">Ranking próximamente disponible</span>
    </div>
  </section>
);

export default Ranking;
