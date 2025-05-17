import React from 'react';

const PasaporteLudico = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pasaporte Lúdico</h2>
          <p className="text-accent max-w-2xl mx-auto">
            Join our membership program and unlock exclusive benefits, tournament entries,
            and special discounts at partner stores.
          </p>
        </div>
        <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="200">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md transition-all duration-300 animate-pulse hover:animate-none hover:scale-105 hover:shadow-lg hover:bg-primary/90 focus:animate-none">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PasaporteLudico; 