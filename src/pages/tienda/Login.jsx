import React, { useState } from 'react';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../components/common/AuthContext';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const { login } = useAuth();

  // TEMPORAL: Solo permite usuario y contraseña 'admin' para probar el frontend
  const handleLogin = (data) => {
    const ok = login(data);
    if (!ok) {
      // El mensaje ya se muestra en AuthContext, pero aquí puedes agregar lógica extra si quieres
    } else {
      setShowModal(false);
    }
  };
  const handleRegister = (data) => {
    // Aquí iría la lógica para manejar el registro
    console.log('Registro:', data);
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} ariaLabel={showRegister ? 'Registro' : 'Iniciar sesión'}>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {showRegister ? 'Crea tu cuenta' : 'Iniciar sesión con su cuenta'}
      </h2>
      {showRegister ? (
        <>
          <UneteForm onRegister={handleRegister} onShowLogin={() => setShowRegister(false)} />
          <div className="text-center text-sm mt-4">
            ¿Ya tiene una cuenta?{' '}
            <button
              type="button"
              className="font-medium text-primary hover:text-primary/80 underline focus:outline-none"
              onClick={() => setShowRegister(false)}
            >
              Inicie sesión aquí
            </button>
          </div>
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
          <div className="text-center text-sm mt-4">
            ¿No tiene una cuenta?{' '}
            <button
              type="button"
              className="font-medium text-primary hover:text-primary/80 underline focus:outline-none"
              onClick={() => setShowRegister(true)}
            >
              Cree una aquí
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Login;
