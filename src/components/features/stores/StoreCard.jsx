import React from 'react';
import Card from '../../common/Card/Card';

const StoreCard = ({ store, index }) => {
  return (
    <Card
      title={store.name}
      image={store.image}
      description={store.location}
      className={
        `overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary group`}
      href="#"
    >
      <p className="text-foreground transition-colors duration-300 group-hover:text-foreground/90 mb-2">
        {store.description}
      </p>
      {/* Animaciones AOS */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={index * 200}
        data-aos-easing="ease-out-cubic"
      />
    </Card>
  );
};

export default StoreCard; 