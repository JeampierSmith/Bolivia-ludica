import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">{t('links')}</h3>
            <ul className="space-y-2">
              <li><a href="/Bolivia-ludica/" className="text-[#222] hover:text-primary font-semibold">{t('home')}</a></li>
              <li><a href="/Bolivia-ludica/comunidad" className="text-[#222] hover:text-primary font-semibold">{t('community')}</a></li>
              <li><a href="/Bolivia-ludica/boliviaplay" className="text-[#222] hover:text-primary font-semibold">{t('play')}</a></li>
              <li><a href="/Bolivia-ludica/ranking" className="text-[#222] hover:text-primary font-semibold">{t('ranking')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">{t('connect')}</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Bolivia-Ludica/61568542995767/" className="text-[#222] hover:text-primary text-2xl" aria-label="Facebook Bolivia Lúdica"><FaFacebook /></a>
              <a href="#" className="text-[#222] hover:text-primary text-2xl" aria-label="Twitter Bolivia Lúdica"><FaTwitter /></a>
              <a href="#" className="text-[#222] hover:text-primary text-2xl" aria-label="Instagram Bolivia Lúdica"><FaInstagram /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">{t('contact')}</h3>
            <p className="text-[#222]"><a href="mailto:BOLIVIALUDICA@gmail.com" className="hover:text-primary underline" target="_blank" rel="noopener noreferrer">{t('email')}: BOLIVIALUDICA@gmail.com</a></p>
            <p className="text-[#222]"><a href="https://wa.me/59177958996" className="hover:text-primary underline" target="_blank" rel="noopener noreferrer">{t('phone')}: +591 77958996</a></p>
            <p className="text-[#222]"><a href="https://maps.google.com/?q=Av. Villarroel, esq. Beni, Cochabamba, Bolivia" className="hover:text-primary underline" target="_blank" rel="noopener noreferrer">{t('address')}: Av. Villarroel, esq. Beni</a></p>
            <p className="text-[#222]">Cochabamba-Bolivia</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">{t('letter')}</h3>
            <div className="flex">
              <label htmlFor="footer-email" className="sr-only">{t('email')}</label>
              <input
                id="footer-email"
                type="email"
                placeholder={t('email')}
                className="px-4 py-2 rounded-l-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center" style={{color: '#222'}}>
          <p>© 2024 Bolivia Lúdica. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;