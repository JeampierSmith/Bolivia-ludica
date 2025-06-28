import React, { useState } from 'react';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../components/common/AuthContext';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const { login } = useAuth();

  // Prefijo de API según entorno
  const apiPrefix = import.meta.env.DEV ? '/api/' : `${import.meta.env.BASE_URL}api/`;
  const loginUrl = `${apiPrefix}auth/login`;

  const handleLogin = async (data) => {
    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Importante para enviar/recibir cookies
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.msg || 'Error de autenticación');
      login(result.usuario); // Solo datos de usuario, el token va en cookie
      setShowModal(false);
      return true;
    } catch (err) {
      return false;
    }
  };
  const handleRegister = async (data) => {
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, rol: 'cliente' })
      });
      const result = await res.json();
      if (res.ok) {
        // Login automático tras registro exitoso
        login({ correo: data.correo, contraseña: data.contraseña });
        setShowModal(false);
      } else {
        alert(result.msg || 'Error al registrar usuario');
      }
    } catch (err) {
      alert('Error de red al registrar usuario');
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {showRegister ? 'Crea tu cuenta' : 'Iniciar sesión con su cuenta'}
      </h2>
      {showRegister ? (
        <>
          <UneteForm onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
          <div className="text-center text-sm mt-4 flex flex-col gap-2">
            <span>¿Ya tiene una cuenta?</span>
            <button
              type="button"
              className="w-full py-2 rounded-md font-bold text-base flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 transition"
              onClick={() => setShowRegister(false)}
            >
              Iniciar sesión
            </button>
          </div>
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
          <div className="text-center text-sm mt-4 flex flex-col gap-2">
            <span>¿No tiene una cuenta?</span>
            <button
              type="button"
              className="w-full py-2 rounded-md font-bold text-base flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 transition"
              onClick={() => setShowRegister(true)}
            >
              Registrarse
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Login;
