import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
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
          className="text-3xl font-bold text-center mb-12 text-foreground"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out-cubic"
        >
          Featured Games
        </h2>
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-easing="ease-out-cubic"
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="max-w-2xl mx-auto"
            effect="fade"
            speed={1000}
            fadeEffect={{
              crossFade: true
            }}
          >
            {featuredGames.map((game, index) => (
              <SwiperSlide key={index}>
                <a
                  href="#"
                  className="block bg-white rounded-lg shadow-sm overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                  tabIndex={0}
                >
                  <div className="overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
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