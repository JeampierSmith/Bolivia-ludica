import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-accent hover:text-primary">Inicio</a></li>
              <li><a href="#" className="text-accent hover:text-primary">Nuestra Comunidad</a></li>
              <li><a href="#" className="text-accent hover:text-primary">Bolivia Play</a></li>
              <li><a href="#" className="text-accent hover:text-primary">Ranking</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Conéctate con Nosotros</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-accent hover:text-primary text-2xl"><FaFacebook /></a>
              <a href="#" className="text-accent hover:text-primary text-2xl"><FaTwitter /></a>
              <a href="#" className="text-accent hover:text-primary text-2xl"><FaInstagram /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Contacto</h3>
            <p className="text-accent">Email: info@bolivialudica.com</p>
            <p className="text-accent">Teléfono: +591 123 456 789</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Boletín</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Ingresa tu email"
                className="px-4 py-2 rounded-l-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-accent">
          <p>© 2024 Bolivia Lúdica. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 