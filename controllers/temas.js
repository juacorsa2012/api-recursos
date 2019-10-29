const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tema = require('../models/tema');

exports.obtenerTemas = asyncHandler(async (req, res, next) => {
	const temas = await Tema.find({});

  	return res.status(200).json({
  		success: true,
  		data: temas
  	});
});

exports.obtenerTema = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const tema = await Tema.findById(id);

	if (!tema) 
		return next(new ErrorResponse(`Tema no encontrado con el id ${id}`), 404);
	  
	return res.status(200).json({
		success: true,
	  	data: tema
	})
});

exports.registrarTema = asyncHandler(async (req, res, next) => {
	const tema = await Tema.create(req.body);

  	res.status(200).json({
    	success: true,
    	data: tema
  	});
});

exports.actualizarTema = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let tema = await Tema.findById(id);

  	if (!tema) 
    	return next(new ErrorResponse(`Tema no encontrado con el id ${id}`), 404);
  
 	tema = await Tema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

   	res.status(200).json({ success: true, data: tema });	 
});
