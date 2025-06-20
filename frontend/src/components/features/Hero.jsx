import { FaDice } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
          Bienvenido a la Comunidad de Juegos de Mesa de Bolivia
        </h1>
        <p className="text-xl text-primary-foreground/90 mb-8">
          Fundada en 2024, uniendo a los entusiastas de juegos de mesa en Bolivia
        </p>
        <div className="animate-bounce">
          <FaDice className="text-6xl text-primary-foreground mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 