const Joi = require('joi');

/**
 * Middleware reutilizable para validar req.body con Joi
 * @param {Joi.ObjectSchema} schema - Esquema de validación Joi
 */
exports.validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errores = error.details.map(e => e.message);
      return res.status(400).json({ msg: 'Datos inválidos', errores });
    }

    next();
  };
};
