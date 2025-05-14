import React, { useState, useEffect } from "react";
import { FaDice, FaFacebook, FaTwitter, FaInstagram, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import { GiMeeple, GiCardPlay, GiTrophyCup } from "react-icons/gi";

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      image: "https://images.unsplash.com/photo-1606503153255-59d5e417e3f3"
    }
  ];

  const featuredGames = [
    {
      name: "CATAN",
      players: "3-4",
      time: "60-120 min",
      image: "https://blog.colonist.io/content/images/size/w2000/2024/06/colonist-io.png"
    },
    {
      name: "King of Tokyo",
      players: "2-6",
      time: "30 min",
      image: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba"
    },
    {
      name: "Carcassonne",
      players: "2-5",
      time: "45 min",
      image: "https://images.unsplash.com/photo-1610890690846-5149750c8634"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2" data-aos="fade-right">
              <GiMeeple className="text-primary text-3xl" />
              <span className="text-2xl font-bold text-foreground">Bolivia Lúdica</span>
            </div>
            <div className="hidden md:flex space-x-6" data-aos="fade-left">
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Home</a>
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Our Community</a>
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Bolivia Play</a>
              <a className="relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1" href="#">Ranking</a>
            </div>
          </nav>
        </div>
      </header>

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
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground" data-aos="fade-up">
            Partner Stores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameStores.map((store, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden" data-aos="fade-up" data-aos-delay={index * 100}>
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{store.name}</h3>
                  <p className="text-accent mb-2">{store.location}</p>
                  <p className="text-foreground">{store.description}</p>
                </div>
              </div>
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
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Games Carousel */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground" data-aos="fade-up">
            Featured Games
          </h2>
          <div className="relative" data-aos="fade-up" data-aos-delay="200">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {featuredGames.map((game, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2 text-foreground">{game.name}</h3>
                        <p className="text-accent">{game.players} Players | {game.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary/80 p-2 rounded-full text-white"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredGames.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary/80 p-2 rounded-full text-white"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

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