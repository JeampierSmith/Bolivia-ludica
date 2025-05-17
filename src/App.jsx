import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedGames from "./components/FeaturedGames";
import Footer from "./components/Footer";
import StoresSection from "./components/StoresSection";
import PasaporteLudico from "./components/PasaporteLudico";

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