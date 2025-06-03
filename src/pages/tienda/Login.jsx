import React, { useState } from 'react';
import LoginForm from '../../components/features/auth/LoginForm';
import UneteForm from '../../components/features/auth/UneteForm';
import Modal from '../../components/common/Modal';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleLogin = (data) => {
    // Aquí iría la lógica para manejar el inicio de sesión
    console.log('Login:', data);
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
        <UneteForm onRegister={handleRegister} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      <div className="text-center text-sm mt-4">
        {showRegister ? (
          <>
            ¿Ya tienes una cuenta?{' '}
            <button type="button" className="font-medium text-primary hover:text-primary/80" onClick={() => setShowRegister(false)}>
              Inicia sesión aquí
            </button>
          </>
        ) : (
          <>
            ¿No tienes una cuenta?{' '}
            <button type="button" className="font-medium text-primary hover:text-primary/80" onClick={() => setShowRegister(true)}>
              Cree una aquí
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Login;
