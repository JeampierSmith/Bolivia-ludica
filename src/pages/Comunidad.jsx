import React from 'react';

const Comunidad = () => (
  <section className="py-16 min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-200">
    <h2 className="text-4xl font-extrabold mb-4 text-neutral-900 drop-shadow">Nuestra Comunidad</h2>
    <p className="max-w-2xl text-center text-lg text-neutral-700 mb-8">
      Únete a la comunidad de Bolivia Lúdica y conecta con jugadores, tiendas y eventos de todo el país. Comparte tus experiencias, participa en actividades y haz crecer el hobby junto a nosotros.
    </p>
    <div className="flex flex-wrap gap-6 justify-center">
      <a href="https://www.facebook.com/people/Bolivia-Ludica/61568542995767/" target="_blank" rel="noopener noreferrer" className="bg-neutral-900 text-white px-6 py-2 rounded shadow hover:bg-neutral-700 transition">Facebook</a>
      <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="bg-neutral-700 text-white px-6 py-2 rounded shadow hover:bg-neutral-900 transition">WhatsApp</a>
      <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="bg-white text-neutral-900 border border-neutral-900 px-6 py-2 rounded shadow hover:bg-neutral-100 transition">Discord</a>
    </div>
  </section>
);

export default Comunidad;
