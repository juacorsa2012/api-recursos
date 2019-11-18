const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tutorial = require('../models/tutorial');

exports.obtenerTutoriales = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedQuery);  	
});

exports.registrarTutorial = asyncHandler(async (req, res, next) => {
	const tutorial = await Tutorial.create(req.body);

  	res.status(201).json({ success: true, data: tutorial });
});

exports.obtenerTutorial = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const tutorial = await Tutorial.findById(id).populate('tema idioma fabricante');

	if (!tutorial) 
		return next(new ErrorResponse(`Tutorial no encontrado con el id ${id}`), 404);
	  
	return res.status(200).json({ success: true, data: tutorial })
});

exports.actualizarTutorial = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let tutorial = await Tutorial.findById(id);

  	if (!tutorial) 
    	return next(new ErrorResponse(`Tutorial no encontrado con el id ${id}`), 404);
  
 	tutorial = await Tutorial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

   	res.status(200).json({ success: true, data: tutorial });	 
});

exports.borrarTutorial = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let tutorial = await Tutorial.findById(id);

  	if (!tutorial) 
    	return next(new ErrorResponse(`Tutorial no encontrado con el id ${id}`), 404);
  
 	await Tutorial.remove();

   	res.status(200).json({ success: true, data: {} });	 
});


