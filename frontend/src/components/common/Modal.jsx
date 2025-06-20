import React, { useEffect, useRef, useState } from 'react';

const Modal = ({ isOpen, onClose, children, ariaLabel = 'Modal' }) => {
  const [show, setShow] = useState(isOpen);
  const [animate, setAnimate] = useState(false);
  const prevChildren = useRef(children);
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Animate content change (login/registro)
  useEffect(() => {
    if (children !== prevChildren.current) {
      setContentKey((k) => k + 1);
      prevChildren.current = children;
    }
  }, [children]);

  useEffect(() => {
    if (!show) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [show, onClose]);

  const backdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${animate ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-0'}`}
      onClick={backdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      style={{ transitionProperty: 'background, backdrop-filter' }}
    >
      <div
        className={`relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-md w-full p-8 transition-all duration-200 transform ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        <button
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-900 dark:hover:text-white text-3xl font-extrabold rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/80 dark:bg-neutral-800/80 shadow-md hover:bg-white dark:hover:bg-neutral-700"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <span className="sr-only">Cerrar</span>
          <span aria-hidden="true">×</span>
        </button>
        <div key={contentKey} className="transition-opacity duration-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
