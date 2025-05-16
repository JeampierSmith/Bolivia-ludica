import React, { useState, useEffect, useRef } from "react";
import { FaDice, FaFacebook, FaTwitter, FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import { GiMeeple, GiCardPlay, GiTrophyCup } from "react-icons/gi";
import FeaturedGames from "./components/FeaturedGames";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMenuClose = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (
        !e.target.closest('#mobile-menu') &&
        !e.target.closest('#hamburger-btn')
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const gameStores = [
    {
      name: "Dice & Dragons",
      location: "La Paz, Bolivia",
      description: "Your premier destination for board games and community events",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09"
    },
    {
      name: "Meeple Haven",
      location: "Santa Cruz, Bolivia",
      description: "Family-friendly gaming environment with expert staff",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015"
    },
    {
      name: "Tabletop Central",
      location: "Cochabamba, Bolivia",
      description: "Biggest selection of strategy games in the region",
      image: "https://www.jestatharogue.com/wp-content/uploads/2022/11/Powerline-Central-Board.jpg"
    }
  ];

  // Altura del header
  const headerHeight = 72; // px (aprox. py-4 + text)

  return (
    <div>
      {/* Header */}
      <header className="bg-card shadow-sm fixed w-full z-50 top-0 left-0">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2" data-aos="fade-right">
              <a href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <GiMeeple className="text-primary text-3xl" />
                <span className="text-2xl font-bold text-foreground">Bolivia Lúdica</span>
              </a>
            </div>
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6" data-aos="fade-left">
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Home</a>
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Our Community</a>
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Bolivia Play</a>
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Ranking</a>
            </div>
            {/* Hamburger icon for mobile */}
            <button id="hamburger-btn" className="md:hidden text-3xl text-primary focus:outline-none" onClick={handleMenuToggle} aria-label="Abrir menú">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </nav>
        </div>
      </header>
      {/* Mobile menu desplegable debajo del header */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed left-0 w-full bg-white shadow-lg z-40 overflow-hidden transition-all duration-300 ${menuOpen ? 'top-[72px] h-60' : 'top-[72px] h-0'}`}
        style={{
          boxShadow: menuOpen ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className={`flex flex-col items-center justify-center transition-opacity duration-300 ${menuOpen ? 'opacity-100 pt-8' : 'opacity-0 pt-0'}`} style={{height: menuOpen ? '15rem' : 0}}>
          <a onClick={handleMenuClose} className="mb-6 relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Home</a>
          <a onClick={handleMenuClose} className="mb-6 relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Our Community</a>
          <a onClick={handleMenuClose} className="mb-6 relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Bolivia Play</a>
          <a onClick={handleMenuClose} className="mb-6 relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Ranking</a>
        </div>
      </div>
      {/* Espacio para el header y menú móvil */}
      <div className={menuOpen ? 'pt-[312px] md:pt-[72px] transition-all duration-300' : 'pt-[72px] transition-all duration-300'} />

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6" data-aos="fade-up">
            Welcome to Bolivia's Board Game Community
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8" data-aos="fade-up" data-aos-delay="200">
            Founded in 2024, bringing together board game enthusiasts across Bolivia
          </p>
          <div className="animate-bounce" data-aos="zoom-in" data-aos-delay="400">
            <FaDice className="text-6xl text-primary-foreground mx-auto" />
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground" data-aos="fade-up" data-aos-duration="1000">
            Partner Stores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameStores.map((store, index) => (
              <a
                key={index}
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
                  <h3 className="text-xl font-bold mb-2 text-foreground transition-colors duration-300 group-hover:text-primary">{store.name}</h3>
                  <p className="text-accent mb-2 transition-colors duration-300 group-hover:text-accent/80">{store.location}</p>
                  <p className="text-foreground transition-colors duration-300 group-hover:text-foreground/90">{store.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pasaporte Ludico Section */}
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

      {/* Featured Games Section */}
      <FeaturedGames />

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div data-aos="fade-up">
              <h3 className="text-lg font-bold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-accent hover:text-primary">Home</a></li>
                <li><a href="#" className="text-accent hover:text-primary">Our Community</a></li>
                <li><a href="#" className="text-accent hover:text-primary">Bolivia Play</a></li>
                <li><a href="#" className="text-accent hover:text-primary">Ranking</a></li>
              </ul>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-lg font-bold mb-4 text-foreground">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-accent hover:text-primary text-2xl"><FaFacebook /></a>
                <a href="#" className="text-accent hover:text-primary text-2xl"><FaTwitter /></a>
                <a href="#" className="text-accent hover:text-primary text-2xl"><FaInstagram /></a>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-lg font-bold mb-4 text-foreground">Contact</h3>
              <p className="text-accent">Email: info@bolivialudica.com</p>
              <p className="text-accent">Phone: +591 123 456 789</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-lg font-bold mb-4 text-foreground">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-accent" data-aos="fade-up">
            <p>© 2024 Bolivia Lúdica. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;