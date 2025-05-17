import React from 'react';

const NavLink = ({ href, children, onClick, className = "" }) => {
  return (
    <a 
      onClick={onClick}
      href={href} 
      className={`relative text-foreground hover:text-primary transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1 ${className}`}
    >
      {children}
    </a>
  );
};

export default NavLink; 