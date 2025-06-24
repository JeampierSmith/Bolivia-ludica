// Valida que un campo no esté vacío
export function required(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

// Valida formato de email
export function isEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

// Valida que un número sea positivo
export function isPositiveNumber(value) {
  return !isNaN(value) && Number(value) > 0;
}

// Valida longitud mínima
export function minLength(value, length) {
  return value && value.length >= length;
}


export function matches(value, other) {
  return value === other;
}
