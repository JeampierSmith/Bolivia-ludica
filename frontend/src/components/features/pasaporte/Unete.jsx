import React, { useState } from 'react';

const initialState = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
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

const Unete = () => {
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
    if (!form.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio';
    if (!validateEmail(form.email)) newErrors.email = 'Correo electrónico inválido';
    const passVal = validatePassword(form.password);
    if (!passVal.length || !passVal.upper || !passVal.lower || !passVal.number || !passVal.special) newErrors.password = 'La contraseña no cumple los requisitos';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.terms) newErrors.terms = 'Debes aceptar los términos';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
    else setSubmitted(false);
  };

  // Colores blanco y negro
  const mainColor = "#191e2b";
  const accentColor = "#fff";
  const borderColor = "#191e2b";
  const bgColor = "#fff";
  const textColor = "#191e2b";

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-8 px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-10 border-t-8 border-black"
        style={{ borderTopColor: borderColor }}
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src={import.meta.env.BASE_URL + 'assets/image/LOGO-BOLIVIA-LUDICA.svg'}
            alt="Bolivia Ludica Logo"
            className="h-32 mb-2"
          />
          <h2 className="text-2xl font-bold" style={{ color: mainColor }}>¡ÚNETE A LA COMUNIDAD!</h2>
          <p className="text-gray-700 text-center mt-1 mb-2">Completa tus datos para crear tu cuenta</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-800 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.nombre ? 'border-red-500' : 'border-black'} bg-white text-black`}
              required
            />
            {errors.nombre && <div className="text-xs text-red-500 mt-1">{errors.nombre}</div>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-800 mb-1">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.apellido ? 'border-red-500' : 'border-black'} bg-white text-black`}
              required
            />
            {errors.apellido && <div className="text-xs text-red-500 mt-1">{errors.apellido}</div>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-1">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-black'} bg-white text-black`}
            required
          />
          {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-black'} bg-white text-black`}
            required
          />
          {/* Barra de seguridad */}
          <div className="mt-2">
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
          <div className="mt-3 p-3 rounded bg-neutral-100 border text-xs">
            <div className="font-semibold mb-1 flex items-center gap-1 text-black"><span>⏰</span> Requisitos de la contraseña:</div>
            <div className="grid grid-cols-2 gap-2">
              <div className={passwordChecks.length ? 'text-green-600' : 'text-gray-700'}>
                {passwordChecks.length ? '✔' : '✗'} 8+ caracteres
              </div>
              <div className={passwordChecks.upper ? 'text-green-600' : 'text-gray-700'}>
                {passwordChecks.upper ? '✔' : '✗'} Mayúscula
              </div>
              <div className={passwordChecks.lower ? 'text-green-600' : 'text-gray-700'}>
                {passwordChecks.lower ? '✔' : '✗'} Minúscula
              </div>
              <div className={passwordChecks.number ? 'text-green-600' : 'text-gray-700'}>
                {passwordChecks.number ? '✔' : '✗'} Número
              </div>
              <div className={passwordChecks.special ? 'text-green-600' : 'text-gray-700'}>
                {passwordChecks.special ? '✔' : '✗'} Especial (!@#$)
              </div>
            </div>
          </div>
          {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-1">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : 'border-black'} bg-white text-black`}
            required
          />
          {errors.confirmPassword && <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className={`mr-2 accent-black ${errors.terms ? 'border-red-500' : 'border-black'}`}
            required
            style={{ accentColor: mainColor }}
          />
          <span className="text-sm text-gray-800">
            Acepto los <a href="#" className="text-black underline">Términos y Condiciones</a> y la <a href="#" className="text-black underline">Política de Privacidad</a>
          </span>
        </div>
        {errors.terms && <div className="text-xs text-red-500 mb-2">{errors.terms}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded-md font-bold text-lg flex items-center justify-center gap-2 bg-black text-white hover:bg-neutral-800 transition"
        >
          <span>Crear Cuenta</span>
        </button>
        {submitted && (
          <div className="mt-4 text-center text-green-600 font-semibold">
            ¡Registro enviado!
          </div>
        )}
      </form>
    </div>
  );
};

export default Unete;
