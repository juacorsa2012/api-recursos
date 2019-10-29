const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Idioma = require('../models/idioma');

exports.obtenerIdiomas = asyncHandler(async (req, res, next) => {
	const idiomas = await Idioma.find({});

  	return res.status(200).json({
  		success: true,
  		data: idiomas
  	});
});

exports.obtenerIdioma = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const idioma = await Idioma.findById(id);

	if (!idioma) 
		return next(new ErrorResponse(`Idioma no encontrado con el id ${id}`), 404);
	  
	return res.status(200).json({
		success: true,
	  	data: idioma
	})
});

exports.registrarIdioma = asyncHandler(async (req, res, next) => {
	const idioma = await Idioma.create(req.body);

  	res.status(200).json({
    	success: true,
    	data: idioma
  	});
});

exports.actualizarIdioma = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let idioma = await Idioma.findById(id);

  	if (!idioma) 
    	return next(new ErrorResponse(`Idioma no encontrado con el id ${id}`), 404);
  
 	idioma = await Idioma.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

   	res.status(200).json({ success: true, data: idioma });	 
});
