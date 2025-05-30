import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PasaporteLudico = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 relative overflow-hidden">
      <img
        src={import.meta.env.BASE_URL + 'assets/image/boardgame.jpeg'}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.25 }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">{t('pasaporte')}</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg drop-shadow">
            {t('pasaporte_description')}
          </p>
        </div>
        <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="200">
          <Link to="/unete">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md transition-all duration-300 animate-pulse hover:animate-none hover:scale-105 hover:shadow-lg hover:bg-primary/90 focus:animate-none">
              {t('join')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PasaporteLudico;