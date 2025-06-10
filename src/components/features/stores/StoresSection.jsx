import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StoreCard from './StoreCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../styles/swiper.css';
import StoreModal from './StoreModal';

const StoresSection = () => {
  const { t } = useTranslation();
  const [selectedStore, setSelectedStore] = useState(null);

  const gameStores = [
    // La Paz
    {
      name: "Bros Game Club",
      location: "La Paz, Bolivia",
      description: "Comunidad activa de juegos de mesa y TCG",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/brosGame.webp',
      email: "bro@bro-s.club",
      facebook: "https://www.facebook.com/brosgameclub/",
      phone: "78252090",
      specialty: "General",
      address: "Av Hernando Siles entre calles 1 y 2, Edificio 'Señor de la Exaltación' local 1 (ex Space Food) No 4683, Obrajes, La Paz, Bolivia",
      website: "#",
      schedule: "Horario no disponible*/",
      instagram: "https://www.instagram.com/brosgameclub/",
      tiktok: ""
    },
    {
      name: "Guarida del Goblin",
      location: "La Paz, Bolivia",
      description: "Especialistas en juegos de rol y miniaturas",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/guaridadelgoblin.webp',
      instagram: "https://www.instagram.com/laguaridadelgoblin/",
      facebook: "https://www.facebook.com/people/La-Guarida-del-Goblin/100063749131951/",
      email: "N/A",
      phone: "N/A",
      specialty: "Rol y Miniaturas",
      address: "Dirección no disponible",
      website: "#",
      schedule: "Horario no disponible",
      tiktok: "https://www.tiktok.com/@guaridadelgoblin"
    },
    {
      name: "Shadow Games",
      location: "La Paz, Bolivia",
      description: "Tu destino para juegos de estrategia",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/shadowgame.webp',
      email: "shadowgamesbol@gmail.com",
      website: "https://shadowgamesbo.com/",
      tiktok: "https://www.tiktok.com/@shadowgamesbo",
      facebook: "https://www.facebook.com/shadowgamesbo/",
      instagram: "https://www.instagram.com/shadow_gamesbo/",
      phone: "62328866",
      specialty: "Estrategia",
      address: "Dirección no disponible",
      schedule: "Horario no disponible"
    },
    // Santa Cruz
    {
      name: "Sharks TCG",
      location: "Santa Cruz, Bolivia",
      description: "Especialistas en juegos de cartas coleccionables",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/sharkstcg.webp',
      phone: "73248263",
      specialty: "Juegos de cartas coleccionables",
      address: "Calle Buenos Aires No. 142 Planta Alta",
      facebook: "https://www.facebook.com/sharkstcg",
      schedule: "Lun–Sab 10:00–20:00",
      email: "N/A",
      website: "#",
      instagram: "https://www.instagram.com/sharks_tcg/",
      tiktok: ""
    },
    {
      name: "La Mazmorra del Jausi",
      location: "Santa Cruz, Bolivia",
      description: "Juegos de mesa y eventos comunitarios",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/juasi.webp',
      phone: "69038332",
      specialty: "General",
      address: "Dr. Leonor Ribera Arteaga 3360, Santa Cruz de la Sierra, Bolivia",
      email: "Monrroysamanta@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/LamazmorradelJausi/",
      instagram: "https://www.instagram.com/lamazmorradeljausi/",
      tiktok: "https://www.tiktok.com/@lamazmorradeljausi"
    },
    {
      name: "Uruloki",
      location: "Santa Cruz, Bolivia",
      description: "Variedad de juegos y torneos semanales",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/uroloki.webp',
      phone: "72620510",
      specialty: "General",
      address: "21 de Mayo y Florida, Santa Cruz de la Sierra, Bolivia",
      email: "urulokiscz@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/people/Urul%C3%B3ki/100064057929678/",
      instagram: "",
      tiktok: ""
    },
    {
      name: "Jugate Esta",
      location: "Santa Cruz, Bolivia",
      description: "Juegos para toda la familia",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/jugateesta.webp',
      phone: "77669066",
      specialty: "Familiar",
      address: "Calle Ñuflo de Chavez #617 3er piso , Santa Cruz de la Sierra, Bolivia",
      email: "jugateesta@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/JugateEsta/",
      instagram: "https://www.instagram.com/jugateesta_bo/",
      tiktok: ""
    },
    // Oruro
    {
      name: "Dados y Dragones",
      location: "Oruro, Bolivia",
      description: "Juegos de rol y mesa en un ambiente acogedor",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/dadosydragones.webp',
      phone: "75704175",
      specialty: "Rol y Mesa",
      address: "Montecinos y Soria Galvarro, Oruro, Bolivia",
      email: "gobajuegos@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/dadosydragonesbo/",
      instagram: "",
      tiktok: ""
    },
    {
      name: "Coffee Arkham",
      location: "Oruro, Bolivia",
      description: "Café y juegos en un ambiente único",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/coffearkham.webp',
      phone: "N/A",
      specialty: "Café y Juegos",
      address: "Dirección no disponible",
      email: "N/A",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/coffee.arkham",
      instagram: "",
      tiktok: ""
    },
    {
      name: "Baul de los Juegos",
      location: "Oruro, Bolivia",
      description: "Gran variedad de juegos clásicos y modernos",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/bauldejuegos.webp',
      phone: "76142380",
      specialty: "General",
      address: "Pagador entre León y Rodríguez, Oruro, Bolivia",
      email: "N/A",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/ElBaulDeLosJuegos01/",
      instagram: "",
      tiktok: "https://www.tiktok.com/@baul.de.los.juegos"
    },
    {
      name: "La posada del Gato",
      location: "Oruro, Bolivia",
      description: "Juegos y comunidad en un espacio único",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/posadadelgato.webp',
      phone: "62789462",
      specialty: "General",
      address: "Avenida del Valle y Calle 4 , Oruro, Bolivia",
      email: "laposadadelgato.4@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/people/La-Posada-Del-Gato/61561165382629/",
      instagram: "",
      tiktok: "https://www.tiktok.com/@la_posada_del_gato_oruro"
    },
    // Tarija
    {
      name: "Mesa Dragon",
      location: "Tarija, Bolivia",
      description: "Juegos de mesa y eventos especiales",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/mesadragon.webp',
      phone: "76187558",
      specialty: "General",
      address: "C. Felix Soto entre C. Bernardo Raña Trigo y C. Juan José Cortez, Tarija, Bolivia",
      email: "mesadragontja@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/MesaDragonTja/",
      instagram: "https://www.instagram.com/mesadragontja/",
      tiktok: ""
    },
    {
      name: "Mini Toys",
      location: "Tarija, Bolivia",
      description: "Juegos para todas las edades",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/minitoys.webp',
      phone: "61856234",
      specialty: "General",
      address: "Calle 15 de Abril #234 entre Méndez y Suipacha, Tarija, Bolivia",
      email: "minitoystarija@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/minitoystarija/",
      instagram: "https://www.instagram.com › minitoystarija",
      tiktok: ""
    },
    {
      name: "Bazinga",
      location: "Tarija, Bolivia",
      description: "Juegos de mesa y entretenimiento",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/bazinga.webp',
      phone: "78706666",
      specialty: "General",
      address: "C/ Avaroa E/ Suipacha y Mendez, Ciudad Tarija, Bolivia",
      email: "bazingacafeludico@gmail.com ",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/people/Bazinga-Caf%C3%A9-L%C3%BAdico/61551852961559/",
      instagram: "",
      tiktok: ""
    },
    {
      name: "Caja de Juegos",
      location: "Tarija, Bolivia",
      description: "Tu tienda local de juegos",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/cajadejuegos.webp',
      phone: "74535305",
      specialty: "General",
      address: "Dirección no disponible",
      email: "Cajadejuegosad@gmail.com",
      website: "https://lacajadejuegos.com/",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/people/La-caja-de-juegos/61557443236887/",
      instagram: "https://www.instagram.com/lacajadejuegosbolivia/",
      tiktok: "https://www.tiktok.com/@lacajadejuegos"
    },
    // Sucre
    {
      name: "Punto de Victoria",
      location: "Sucre, Bolivia",
      description: "Juegos de mesa y comunidad activa",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/puntodevictoria.webp',
      phone: "61892074",
      specialty: "General",
      address: "Dirección no disponible",
      email: "puntodevictoriasucre@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/people/Punto-de-Victoria/100093685569540/",
      instagram: "",
      tiktok: "https://www.tiktok.com/@puntodevictoria_sucre"
    },
    // Potosí
    {
      name: "Le Gato",
      location: "Potosí, Bolivia",
      description: "Juegos y diversión para todos",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/legato.webp',
      phone: "70461652",
      specialty: "General",
      address: "Dirección no disponible",
      email: "jhontitorjontitor.f@gmail.com",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/people/Le-Gato-Ludo-Club/61564192205114/",
      instagram: "",
      tiktok: ""
    },
    // Cochabamba
    {
      name: "Tinkuna Games",
      location: "Cochabamba, Bolivia",
      description: "Juegos de mesa y eventos especiales",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/tinkunagmaes.webp',
      phone: "77958996",
      specialty: "General",
      address: "Dirección no disponible",
      email: "elpobladobtg@gmail.com",
      website: "https://sites.google.com/view/catalogo-tinkuna-games/productos",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/people/El-Poblado/61562278854386/",
      instagram: "https://www.instagram.com/elpobladobtg/",
      tiktok: " https://www.tiktok.com/@el.poblado.by.tin"
    },
    {
      name: "Magic Games",
      location: "Cochabamba, Bolivia",
      description: "Especialistas en Magic: The Gathering",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/magicgames.webp',
      phone: "N/A",
      specialty: "Magic: The Gathering",
      address: "Dirección no disponible",
      email: "N/A",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "",
      instagram: "",
      tiktok: ""
    },
    {
      name: "El Mercader Errante",
      location: "Cochabamba, Bolivia",
      description: "Juegos de mesa y rol",
      image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/mercadererrante.webp',
      phone: "72219585",
      specialty: "Mesa y Rol",
      address: "Dirección no disponible",
      email: "juancvc_1@hotmail.com",
      website: "https://magicgamesbolivia.com/",
      schedule: "Horario no disponible",
      facebook: "juancvc_1@hotmail.com",
      instagram: "https://www.instagram.com/magicgamesbolivia/",
      tiktok: "https://www.tiktok.com/@magicgamesbolivia"
    },
    {
      name: "Games Landing",
      location: "Cochabamba, Bolivia",
      description: "Tu destino para juegos de mesa",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/gameslanding.webp',
      phone: "74570507",
      specialty: "General",
      address: "Dirección no disponible",
      email: "info@gameslanding.com",
      website: "https://gameslanding.com/",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/GamesLanding/",
      instagram: "https://www.instagram.com/gameslanding.bo/",
      tiktok: "https://www.tiktok.com/@gameslandingbo"
    },
    {
      name: "Antikuna",
      location: "Cochabamba, Bolivia",
      description: "Juegos y entretenimiento para todos",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      logo: import.meta.env.BASE_URL + 'assets/image/stores/antikuna.webp',
      phone: "N/A",
      specialty: "General",
      address: "Av. Juan de la Rosa # 256, Cochabamba, Bolivia",
      email: "",
      website: "#",
      schedule: "Horario no disponible",
      facebook: "https://www.facebook.com/antikunacafe/",
      instagram: "https://www.instagram.com/antikunaboardgamecafe/",
      tiktok: ""
    }
  ];

  // Agrupar tiendas por ciudad
  const storesByCity = {};
  gameStores.forEach(store => {
    if (!storesByCity[store.location]) {
      storesByCity[store.location] = [];
    }
    storesByCity[store.location].push(store);
  });

  return (
    <section className="py-8 sm:py-16 bg-card">
      <div className="container mx-auto px-1 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground" data-aos="fade-up" data-aos-duration="1000">
          {t('partner')}
        </h2>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="stores-swiper"
            speed={700}
            style={{overflow: 'hidden'}}
          >
            {Object.entries(storesByCity).map(([city, stores], idx) => (
              <SwiperSlide key={city}>
                <div
                  className="bg-white rounded-lg shadow-lg p-4 sm:p-8 flex flex-col items-center h-full border-2 border-transparent stores-slide group transition-all duration-300 min-w-0 max-w-full"
                  style={{ boxSizing: 'border-box' }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary text-center">{city}</h3>
                  <ul className="w-full space-y-4 sm:space-y-6">
                    {stores.map((store, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 sm:gap-4 border-b pb-3 sm:pb-4 last:border-b-0 last:pb-0 cursor-pointer hover:bg-gray-100 p-2 rounded transition-all duration-200 hover:shadow-lg hover:scale-[1.03] group"
                        onClick={() => setSelectedStore(store)}
                        tabIndex={0}
                        aria-label={`Ver detalles de ${store.name}`}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm relative">
                          <img
                            src={store.logo || 'https://via.placeholder.com/48?text=Logo'}
                            alt={`${store.name} logo`}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full"
                            title={store.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/48?text=Logo';
                            }}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="font-bold text-base sm:text-lg text-foreground flex items-center gap-2 flex-wrap">
                            {store.name}
                            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded ml-1 border border-primary/20" title={store.specialty}>{store.specialty}</span>
                          </div>
                          <div className="text-accent mb-1 text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">{store.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <StoreModal
        store={selectedStore}
        isOpen={!!selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </section>
  );
};

export default StoresSection;