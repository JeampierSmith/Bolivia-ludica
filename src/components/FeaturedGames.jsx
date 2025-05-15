import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/swiper.css';

const FeaturedGames = () => {
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

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl font-bold text-center mb-12 text-foreground opacity-0 transform translate-y-4 transition-all duration-700 ease-out"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
          style={{ animation: 'fadeInUp 0.7s ease-out forwards' }}
        >
          Featured Games
        </h2>
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000"
          data-aos-delay="300"
          className="opacity-0 transform translate-y-4 transition-all duration-700 ease-out"
          style={{ animation: 'fadeInUp 0.7s ease-out 0.3s forwards' }}
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="max-w-2xl mx-auto"
          >
            {featuredGames.map((game, index) => (
              <SwiperSlide key={index}>
                <a
                  href="#"
                  className="block bg-white rounded-lg shadow-sm overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary"
                  tabIndex={0}
                >
                  <div className="overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-2xl font-bold mb-2 text-foreground transition-colors duration-300 group-hover:text-primary">
                      {game.name}
                    </h3>
                    <p className="text-accent transition-colors duration-300 group-hover:text-accent/80">
                      {game.players} Players | {game.time}
                    </p>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames; 