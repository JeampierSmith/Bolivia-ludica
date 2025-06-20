import React from "react";

const Card = ({
  title,
  image,
  description,
  children,
  className = "",
  underlineOnHover = false,
  href,
  aos = "fade-up",
  aosDelay = 0,
  aosDuration = 1000,
}) => {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      href={href}
      className={`bg-white rounded-lg shadow p-4 hover:shadow-lg transition flex flex-col h-full group relative cursor-pointer ${className}`}
      data-aos={aos}
      data-aos-delay={aosDelay}
      data-aos-duration={aosDuration}
      data-aos-easing="ease-out-cubic"
      tabIndex={href ? 0 : undefined}
    >
      {image && (
        <div className="w-full aspect-video mb-2 rounded overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        {description && <p className="text-gray-600 mb-2">{description}</p>}
        {children}
      </div>
      {underlineOnHover && (
        <span className="block h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full absolute left-0 bottom-0"></span>
      )}
    </Wrapper>
  );
};

export default Card; 