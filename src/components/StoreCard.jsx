import React from 'react';

const StoreCard = ({ store, index }) => {
  return (
    <a
      href="#"
      className="block bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary group"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={index * 200}
      data-aos-easing="ease-out-cubic"
      tabIndex={0}
    >
      <div className="overflow-hidden">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6 relative">
        <h3 className="text-xl font-bold mb-2 text-foreground transition-colors duration-300 group-hover:text-primary">
          {store.name}
        </h3>
        <p className="text-accent mb-2 transition-colors duration-300 group-hover:text-accent/80">
          {store.location}
        </p>
        <p className="text-foreground transition-colors duration-300 group-hover:text-foreground/90">
          {store.description}
        </p>
      </div>
    </a>
  );
};

export default StoreCard; 