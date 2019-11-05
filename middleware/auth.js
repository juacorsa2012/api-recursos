const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const config = require('config');
const ErrorResponse = require('../utils/errorResponse');
const Usuario = require('../models/usuario');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  const mensaje = 'Acceso no permitido';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse(mensaje, 401));
  }

  try {
    const JWT_SECRET = config.get('jwt_secret')
    const decoded = jwt.verify(token, JWT_SECRET);

    req.usuario = await Usuario.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse(mensaje, 401));
  }
});

exports.isRole = (...roles) => {  
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return next(new ErrorResponse('Usuario no autorizado para acceder a esta ruta', 403));
    }
    next();
  };
};


