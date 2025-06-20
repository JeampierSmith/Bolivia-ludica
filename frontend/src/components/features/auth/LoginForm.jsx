import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin, onShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (onLogin) {
      const result = await onLogin({ email, password });
      if (result === false) {
        setError('Usuario o contraseña incorrectos.');
      }
    }
    setLoading(false);
  };

  return (
    <>
      {/* TEMPORAL: Para probar el frontend, use usuario: admin@gmail.com y contraseña: admin */}
      <div className="mb-2 text-center text-xs text-orange-600 font-semibold bg-orange-50 border border-orange-200 rounded p-2">
        <strong>Prueba rápida:</strong> Usuario: <span className="font-mono bg-white text-black px-1 rounded">admin@gmail.com</span> &nbsp; Contraseña: <span className="font-mono bg-white text-black px-1 rounded">admin</span>
      </div>
      {error && (
        <div className="mb-2 text-center text-xs text-red-600 font-semibold bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleLogin} aria-label="Formulario de inicio de sesión">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Dirección de correo electrónico</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Dirección de correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Dirección de correo electrónico"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Contraseña"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5 font-medium rounded-r-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link to="#" className="font-medium text-primary hover:text-primary/80">
              ¿Olvidó su contraseña?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
          </button>
        </div>
        <div className="text-center text-sm mt-4">
          ¿No tiene una cuenta?{' '}
          <button
            type="button"
            className="font-medium text-primary hover:text-primary/80 underline focus:outline-none"
            onClick={onShowRegister}
          >
            Cree una aquí
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
