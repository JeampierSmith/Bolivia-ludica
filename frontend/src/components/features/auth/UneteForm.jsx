import React, { useState } from 'react';

const initialState = {
  nombre: '',
  correo: '',
  telefono: '',
  direccion: '',
  password: '',
  confirmPassword: '',
};

const validateEmail = (email) => /.+@.+\..+/.test(email);
const validatePassword = (password) => {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
  };
};

const Unete = (props) => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({length: false, upper: false, lower: false, number: false, special: false});

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors({ ...errors, [name]: undefined });
    setSubmitted(false); // Resetear submitted al cambiar campos
    if (name === 'password') {
      const checks = validatePassword(value);
      setPasswordChecks(checks);
      // Score: 1 por cada check positivo
      const score = Object.values(checks).filter(Boolean).length;
      setPasswordScore(score);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.correo.trim() || !validateEmail(form.correo)) newErrors.correo = 'Correo electrónico inválido';
    if (!form.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!form.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
    const passVal = validatePassword(form.password);
    if (!passVal.length || !passVal.upper || !passVal.lower || !passVal.number || !passVal.special) newErrors.password = 'La contraseña no cumple los requisitos';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0 && !submitted) {
      setSubmitted(true);
      if (props.onRegister) {
        props.onRegister(form);
      }
    } else setSubmitted(false);
  };

  // Colores blanco y negro
  const mainColor = "#191e2b";
  const accentColor = "#fff";
  const borderColor = "#191e2b";
  const bgColor = "#fff";
  const textColor = "#191e2b";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto p-4 sm:p-6 md:p-8 border-t-8 border-black overflow-y-auto"
      style={{ borderTopColor: borderColor, maxHeight: '80vh' }}
    >
      <div className="flex flex-col items-center mb-4">
        <img
          src={import.meta.env.BASE_URL + 'assets/image/LOGO-BOLIVIA-LUDICA.svg'}
          alt="Bolivia Ludica Logo"
          className="h-20 mb-2"
        />
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: mainColor }}>¡ÚNETE A LA COMUNIDAD!</h2>
        <p className="text-gray-700 text-center mt-1 mb-2 text-sm">Completa tus datos para crear tu cuenta</p>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-800 mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-2 focus:outline-none focus:ring-2 ${errors.nombre ? 'border-red-500' : 'border-black'} bg-white text-black text-sm`}
          required
        />
        {errors.nombre && <div className="text-xs text-red-500 mt-1">{errors.nombre}</div>}
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-800 mb-1">Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-2 focus:outline-none focus:ring-2 ${errors.correo ? 'border-red-500' : 'border-black'} bg-white text-black text-sm`}
          required
        />
        {errors.correo && <div className="text-xs text-red-500 mt-1">{errors.correo}</div>}
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-800 mb-1">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-2 focus:outline-none focus:ring-2 ${errors.telefono ? 'border-red-500' : 'border-black'} bg-white text-black text-sm`}
          required
        />
        {errors.telefono && <div className="text-xs text-red-500 mt-1">{errors.telefono}</div>}
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-800 mb-1">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-2 focus:outline-none focus:ring-2 ${errors.direccion ? 'border-red-500' : 'border-black'} bg-white text-black text-sm`}
          required
        />
        {errors.direccion && <div className="text-xs text-red-500 mt-1">{errors.direccion}</div>}
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-800 mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-2 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-black'} bg-white text-black text-sm`}
          required
        />
        {/* Barra de seguridad */}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-700">Seguridad de la contraseña:</span>
            <span className={`text-xs font-bold ${passwordScore <= 2 ? 'text-red-500' : passwordScore === 3 ? 'text-yellow-500' : passwordScore === 4 ? 'text-blue-500' : 'text-green-600'}`}>{
              passwordScore <= 2 ? 'Muy débil' : passwordScore === 3 ? 'Débil' : passwordScore === 4 ? 'Aceptable' : 'Fuerte'
            }</span>
          </div>
          <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
            <div
              className={`h-2 rounded transition-all duration-300 ${
                passwordScore <= 2 ? 'bg-red-500' : passwordScore === 3 ? 'bg-yellow-500' : passwordScore === 4 ? 'bg-blue-500' : 'bg-green-600'
              }`}
              style={{ width: `${(passwordScore / 5) * 100}%` }}
            />
          </div>
        </div>
        {/* Requisitos visuales */}
        <div className="mt-2 p-2 rounded bg-white border text-xs">
          <div className="font-semibold mb-1 flex items-center gap-1 text-black bg-white px-1 rounded"><span>⏰</span> Requisitos de la contraseña:</div>
          <div className="grid grid-cols-2 gap-1">
            <div className={passwordChecks.length ? 'text-green-700 bg-white px-1 rounded' : 'text-gray-800 bg-white px-1 rounded'}>
              {passwordChecks.length ? '✔' : '✗'} 8+ caracteres
            </div>
            <div className={passwordChecks.upper ? 'text-green-700 bg-white px-1 rounded' : 'text-gray-800 bg-white px-1 rounded'}>
              {passwordChecks.upper ? '✔' : '✗'} Mayúscula
            </div>
            <div className={passwordChecks.lower ? 'text-green-700 bg-white px-1 rounded' : 'text-gray-800 bg-white px-1 rounded'}>
              {passwordChecks.lower ? '✔' : '✗'} Minúscula
            </div>
            <div className={passwordChecks.number ? 'text-green-700 bg-white px-1 rounded' : 'text-gray-800 bg-white px-1 rounded'}>
              {passwordChecks.number ? '✔' : '✗'} Número
            </div>
            <div className={passwordChecks.special ? 'text-green-700 bg-white px-1 rounded' : 'text-gray-800 bg-white px-1 rounded'}>
              {passwordChecks.special ? '✔' : '✗'} Especial (!@#$)
            </div>
          </div>
        </div>
        {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-800 mb-1">Confirmar contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-2 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : 'border-black'} bg-white text-black text-sm`}
          required
        />
        {errors.confirmPassword && <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>}
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-md font-bold text-base flex items-center justify-center gap-2 bg-black text-white hover:bg-neutral-800 transition mt-4 mb-2"
        style={{ minHeight: '44px' }}
      >
        <span>Crear Cuenta</span>
      </button>
      {submitted && (
        <div className="mt-3 text-center text-green-600 font-semibold text-sm">
          ¡Registro enviado!
        </div>
      )}
      <div className="text-center text-sm mt-4">
        ¿Ya tiene una cuenta?{' '}
        <button
          type="button"
          className="font-medium text-primary hover:text-primary/80 underline focus:outline-none"
          onClick={props.onShowLogin}
        >
          Inicie sesión aquí
        </button>
      </div>
    </form>
  );
};

export default Unete;
