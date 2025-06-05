import React, { useState } from 'react';

const initialState = {
  nombre: '',
  apellidos: '',
  celular: '',
  nacimiento: '',
  sexo: '',
  tipoDocumento: '',
  nroDocumento: '',
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

const UneteForm = ({ onRegister, onShowLogin }) => {
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
      const score = Object.values(checks).filter(Boolean).length;
      setPasswordScore(score);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!form.celular.trim() || !/^\d{8}$/.test(form.celular)) newErrors.celular = 'Celular inválido (8 dígitos)';
    if (!form.nacimiento) newErrors.nacimiento = 'Fecha de nacimiento obligatoria';
    if (!form.sexo) newErrors.sexo = 'Selecciona tu sexo';
    if (!form.tipoDocumento) newErrors.tipoDocumento = 'Selecciona tipo de documento';
    if (!form.nroDocumento.trim()) newErrors.nroDocumento = 'Número de documento obligatorio';
    if (!validateEmail(form.email)) newErrors.email = 'Correo electrónico inválido';
    const passVal = validatePassword(form.password);
    if (!passVal.length || !passVal.upper || !passVal.lower || !passVal.number || !passVal.special) newErrors.password = 'La contraseña no cumple los requisitos';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.terms) newErrors.terms = 'Debes aceptar los términos';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      if (onRegister) onRegister(form);
    } else setSubmitted(false);
  };

  // Black/white modern style
  const mainColor = "#191e2b";
  const accentColor = "#000";

  return (
    <form className="space-y-6 max-w-lg w-full mx-auto p-6 bg-white rounded-2xl shadow-xl border border-black/10" onSubmit={handleSubmit} style={{minWidth:0}}>
      <h2 className="text-2xl font-bold text-center mb-2 text-black">Crea tu cuenta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.nombre ? 'border-red-500' : ''}`}
            required
          />
          {errors.nombre && <div className="text-xs text-red-500 mt-1">{errors.nombre}</div>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.apellidos ? 'border-red-500' : ''}`}
            required
          />
          {errors.apellidos && <div className="text-xs text-red-500 mt-1">{errors.apellidos}</div>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Celular</label>
          <input
            type="tel"
            name="celular"
            value={form.celular}
            onChange={handleChange}
            maxLength={8}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.celular ? 'border-red-500' : ''}`}
            required
          />
          {errors.celular && <div className="text-xs text-red-500 mt-1">{errors.celular}</div>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Fecha de nacimiento</label>
          <input
            type="date"
            name="nacimiento"
            value={form.nacimiento}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.nacimiento ? 'border-red-500' : ''}`}
            required
          />
          {errors.nacimiento && <div className="text-xs text-red-500 mt-1">{errors.nacimiento}</div>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Sexo</label>
          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.sexo ? 'border-red-500' : ''}`}
            required
          >
            <option value="">Selecciona</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          {errors.sexo && <div className="text-xs text-red-500 mt-1">{errors.sexo}</div>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Tipo de documento</label>
          <select
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.tipoDocumento ? 'border-red-500' : ''}`}
            required
          >
            <option value="">Selecciona</option>
            <option value="CI">Cédula de Identidad</option>
            <option value="PAS">Pasaporte</option>
            <option value="OTRO">Otro</option>
          </select>
          {errors.tipoDocumento && <div className="text-xs text-red-500 mt-1">{errors.tipoDocumento}</div>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Nro. de documento</label>
          <input
            type="text"
            name="nroDocumento"
            value={form.nroDocumento}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.nroDocumento ? 'border-red-500' : ''}`}
            required
          />
          {errors.nroDocumento && <div className="text-xs text-red-500 mt-1">{errors.nroDocumento}</div>}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-black mb-1">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.email ? 'border-red-500' : ''}`}
          required
        />
        {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.password ? 'border-red-500' : ''}`}
            required
          />
          {/* Barra de seguridad */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Seguridad de la contraseña:</span>
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
          <div className="mt-3 p-3 rounded bg-gray-50 border text-xs">
            <div className="font-semibold mb-1 flex items-center gap-1"><span>⏰</span> Requisitos de la contraseña:</div>
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
        <div>
          <label className="block text-xs font-semibold text-black mb-1">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full border border-black/20 rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            required
          />
          {errors.confirmPassword && <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>}
        </div>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          name="terms"
          checked={form.terms}
          onChange={handleChange}
          className={`mr-2 accent-black ${errors.terms ? 'border-red-500' : ''}`}
          required
        />
        <span className="text-xs text-black">
          Acepto los <a href="#" className="underline hover:text-black/70">Términos y Condiciones</a> y la <a href="#" className="underline hover:text-black/70">Política de Privacidad</a>
        </span>
      </div>
      {errors.terms && <div className="text-xs text-red-500 mb-2">{errors.terms}</div>}
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 bg-black text-white hover:bg-neutral-900 transition"
        style={{ boxShadow: `0 2px 8px 0 #0002` }}
      >
        <span>Crear Cuenta</span>
      </button>
      {submitted && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          ¡Registro enviado!
        </div>
      )}
      <div className="text-center text-xs mt-2 text-black/80">
        ¿Ya tienes una cuenta?{' '}
        <button type="button" className="font-medium underline hover:text-black" onClick={onShowLogin}>
          Inicia sesión aquí
        </button>
      </div>
    </form>
  );
};

export default UneteForm;
