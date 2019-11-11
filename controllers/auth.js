const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Usuario = require('../models/usuario');

exports.registro = asyncHandler(async (req, res, next) => {
  const { nombre, email, password, rol } = req.body;

  const usuario = await Usuario.create({ nombre, email, password, rol });
  const token = usuario.obtenerToken();
  
  res.status(200).json({success: true, token})
});

exports.login = asyncHandler(async (req, res, next) => {
  const mensaje = 'Email y/o contraseña incorrectos';
  const { email, password } = req.body;

  if (!email || !password) 
    return next(new ErrorResponse(mensaje, 400));  
  
  const usuario = await Usuario.findOne({ email }).select('+password');

  if (!usuario) 
  	return next(new ErrorResponse(mensaje, 401));  

  const esPasswordCorrecto = await usuario.validarPassword(password);

  if (!esPasswordCorrecto) 
  	return next(new ErrorResponse(mensaje, 401));  

  const token = usuario.obtenerToken();

  res.status(200).json({success: true, token})
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id);

  res.status(200).json({success: true, data: usuario });
});
