import React from 'react';
import { useTranslation } from 'react-i18next';
import StoreCard from './StoreCard';

const StoresSection = () => {
  const { t } = useTranslation();

  const gameStores = [
    {
      name: "Dice & Dragons",
      location: "La Paz, Bolivia",
      description: "Su destino principal para juegos de mesa y eventos comunitarios",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09"
    },
    {
      name: "Meeple Haven",
      location: "Santa Cruz, Bolivia",
      description: "Entorno de juego familiar con personal experto",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015"
    },
    {
      name: "Tabletop Central",
      location: "Cochabamba, Bolivia",
      description: "La mayor selección de juegos de estrategia en la región",
      image: "https://www.jestatharogue.com/wp-content/uploads/2022/11/Powerline-Central-Board.jpg"
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground" data-aos="fade-up" data-aos-duration="1000">
          {t('partner')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gameStores.map((store, index) => (
            <StoreCard key={index} store={store} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoresSection;