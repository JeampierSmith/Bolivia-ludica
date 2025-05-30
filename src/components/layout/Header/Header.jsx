import React, { useState, useEffect, useRef } from "react";
import { GiMeeple } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import NavLink from "../Navigation/NavLink";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMenuClose = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (
        !e.target.closest('#mobile-menu') &&
        !e.target.closest('#hamburger-btn')
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const navLinks = [
    { href: "/", text: t('home', 'Inicio') },
    { href: "/comunidad", text: t('community', 'Nuestra Comunidad') },
    { href: "/boliviaplay", text: t('play', 'Bolivia Play') },
    { href: "/ranking", text: t('ranking', 'Ranking') }
  ];

  // Selector de idioma
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <>
      <header className="bg-card shadow-sm fixed w-full z-50 top-0 left-0">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2" data-aos="fade-right">
              <a href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <img 
                  src={import.meta.env.BASE_URL + 'assets/image/LOGO-BOLIVIA-LUDICA.svg'}
                  alt="Bolivia Ludica Logo" 
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-bold text-foreground font-['Prototype'] tracking-wider uppercase">Bolivia Ludica</span>
              </a>
            </div>
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6" data-aos="fade-left">
              {navLinks.map((link, index) => (
                <NavLink key={index} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
              <select onChange={e => changeLanguage(e.target.value)} value={i18n.language} className="ml-4 px-2 py-1 rounded">
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
            </div>
            {/* Hamburger icon for mobile */}
            <button 
              id="hamburger-btn" 
              className="md:hidden text-3xl text-primary focus:outline-none" 
              onClick={handleMenuToggle} 
              aria-label="Abrir menú"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </nav>
        </div>
      </header>
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed left-0 w-full bg-white shadow-lg z-40 overflow-hidden transition-all duration-300 ${menuOpen ? 'top-[72px] h-60' : 'top-[72px] h-0'}`}
        style={{
          boxShadow: menuOpen ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className={`flex flex-col items-center justify-center transition-opacity duration-300 ${menuOpen ? 'opacity-100 pt-8' : 'opacity-0 pt-0'}`} style={{height: menuOpen ? '15rem' : 0}}>
          {navLinks.map((link, index) => (
            <NavLink 
              key={index} 
              href={link.href} 
              onClick={handleMenuClose}
              className="mb-6"
            >
              {link.text}
            </NavLink>
          ))}
          <select onChange={e => changeLanguage(e.target.value)} value={i18n.language} className="mt-2 px-2 py-1 rounded">
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
      {/* Espacio para el header y menú móvil */}
      <div className={menuOpen ? 'pt-[312px] md:pt-[72px] transition-all duration-300' : 'pt-[72px] transition-all duration-300'} />
    </>
  );
};

export default Header;