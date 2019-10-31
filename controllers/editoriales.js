const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Editorial = require('../models/editorial');

exports.obtenerEditoriales = asyncHandler(async (req, res, next) => {
	const editoriales = await Editorial.find({});

  	return res.status(200).json({
  		success: true,
  		data: editoriales
  	});
});

exports.obtenerEditorial = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const editorial = await Editorial.findById(id);

	if (!editorial) 
		return next(new ErrorResponse(`Editorial no encontrada con el id ${id}`), 404);
	  
  	return res.status(200).json({
  		success: true,
  		data: editorial
  	});
});

exports.registrarEditorial = asyncHandler(async (req, res, next) => {
	const editorial = await Editorial.create(req.body);

  	res.status(201).json({
    	success: true,
    	data: editorial
  	});
});

exports.actualizarEditorial = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let editorial = await Editorial.findById(id);

  	if (!editorial) 
    	return next(new ErrorResponse(`Editorial no encontrada con el id ${id}`), 404);
  
 	editorial = await Editorial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

   	res.status(200).json({ success: true, data: editorial });	 
});
