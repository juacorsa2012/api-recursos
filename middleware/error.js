const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;   

  // Error Mongoose ObjectId
  if (err.name === 'CastError') {
    const message = `Recurso no encontrado`;
    error = new ErrorResponse(message, 404);
  }

  // Error campo duplicado
  if (err.code === 11000) {
    const message = 'Valor duplicado introducido';
    error = new ErrorResponse(message, 400);
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error interno de servidor'
  });
};

module.exports = errorHandler;
