import React from "react";
import Header from "./components/layout/Header/Header";
import Hero from "./components/features/Hero";
import FeaturedGames from "./components/features/games/FeaturedGames";
import Footer from "./components/layout/Footer/Footer";
import StoresSection from "./components/features/stores/StoresSection";
import PasaporteLudico from "./components/features/pasaporte/PasaporteLudico";

const App = () => {
  
  return (
    <div>
      <Header />
      <Hero />
      <StoresSection />
      <PasaporteLudico />
      <FeaturedGames />
      <Footer />
    </div>
  );
};

export default App;