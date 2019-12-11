const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Enlace = require('../models/enlace');

exports.obtenerEnlaces = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedQuery);  	
});

exports.registrarEnlace = asyncHandler(async (req, res, next) => {
	const enlace = await Enlace.create(req.body);

  	res.status(201).json({ success: true, data: enlace });
});

exports.obtenerEnlace = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const enlace = await Enlace.findById(id).populate('tema');

	if (!enlace) 
		return next(new ErrorResponse(`Enlace no encontrado con el id ${id}`), 404);
	  
	return res.status(200).json({ success: true, data: enlace })
});

exports.actualizarEnlace = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let enlace = await Enlace.findById(id);

  	if (!enlace) 
    	return next(new ErrorResponse(`Enlace no encontrado con el id ${id}`), 404);
  
 	enlace = await Enlace.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

   	res.status(200).json({ success: true, data: enlace });	 
});

exports.borrarEnlace = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let enlace = await Enlace.findById(id);

  	if (!enlace) 
    	return next(new ErrorResponse(`Enlace no encontrado con el id ${id}`), 404);
  
 	await enlace.remove();

   	res.status(200).json({ success: true, data: {} });	 
});

exports.contarEnlaces = asyncHandler(async (req, res, next) => {
	const enlaces = await Enlace.countDocuments();

  	res.status(200).json({ success: true, enlaces });
});

exports.obtenerEnlacesPorTemas = async (req, res, next) => {
	const documents = await Enlace.countDocuments();
	const data = await Enlace.obtenerEnlacesPorTema();

  	res.status(200).json({ success: true, enlaces: documents, data });
};