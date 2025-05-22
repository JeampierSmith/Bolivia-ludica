import { useTranslation } from 'react-i18next';
import { FaDice } from "react-icons/fa";
const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
          {t("welcome")}
        </h1>
        <p className="text-xl text-primary-foreground/90 mb-8">
          {t("description")}
        </p>
        <div className="animate-bounce">
          <FaDice className="text-6xl text-primary-foreground mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;