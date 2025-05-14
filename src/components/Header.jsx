import { GiMeeple } from "react-icons/gi";

const Header = () => {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GiMeeple className="text-primary text-3xl" />
            <span className="text-2xl font-bold text-foreground">Bolivia Lúdica</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a className="text-foreground hover:text-primary transition-colors" href="#">Home</a>
            <a className="text-foreground hover:text-primary transition-colors" href="#">Our Community</a>
            <a className="text-foreground hover:text-primary transition-colors" href="#">Bolivia Play</a>
            <a className="text-foreground hover:text-primary transition-colors" href="#">Ranking</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 