const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Fabricante = require('../models/fabricante');

exports.obtenerFabricantes = asyncHandler(async (req, res, next) => {
	const fabricantes = await Fabricante.find({});

  	return res.status(200).json({
  		success: true,
  		data: fabricantes
  	});
});

exports.obtenerFabricante = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const fabricante = await Fabricante.findById(id);

	if (!fabricante) 
		return next(new ErrorResponse(`Fabricante no encontrado con el id ${id}`), 404);
	  
	return res.status(200).json({
		success: true,
	  	data: fabricante
	})
});

exports.registrarFabricante = asyncHandler(async (req, res, next) => {
	const fabricante = await Fabricante.create(req.body);

  	res.status(200).json({
    	success: true,
    	data: fabricante
  	});
});

exports.actualizarFabricante = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let fabricante = await Fabricante.findById(id);

  	if (!fabricante) 
    	return next(new ErrorResponse(`Fabricante no encontrado con el id ${id}`), 404);
  
 	fabricante = await Fabricante.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

   	res.status(200).json({ success: true, data: fabricante });	 
});
