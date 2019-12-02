const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Libro = require('../models/libro');

exports.obtenerLibros = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedQuery);  	
});

exports.registrarLibro = asyncHandler(async (req, res, next) => {
	const libro = await Libro.create(req.body);

  	res.status(201).json({ success: true, data: libro });
});

exports.obtenerLibro = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const libro = await Libro.findById(id).populate('tema idioma editorial');

	if (!libro) 
		return next(new ErrorResponse(`Libro no encontrado con el id ${id}`), 404);
	  
	return res.status(200).json({ success: true, data: libro })
});

exports.actualizarLibro = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let libro = await Libro.findById(id);

  	if (!libro) 
    	return next(new ErrorResponse(`Libro no encontrado con el id ${id}`), 404);
  
 	libro = await Libro.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

   	res.status(200).json({ success: true, data: libro });	 
});

exports.borrarLibro = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	let libro = await Libro.findById(id);

  	if (!libro) 
    	return next(new ErrorResponse(`Libro no encontrado con el id ${id}`), 404);
  
 	await Libro.remove();

   	res.status(200).json({ success: true, data: {} });	 
});

exports.contarLibros = asyncHandler(async (req, res, next) => {
	const documents = await Libro.countDocuments();

  	res.status(200).json({ success: true, count: documents });
});

exports.obtenerLibrosPorTema = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const aggregate = await Libro.obtenerLibrosPorTema();

	data = [];

	aggregate.forEach((element, index, array) => {    	
    	data.push({
    		"tema" : element._id, 
    		"total": element.total, 
    		"peso" : ((element.total/documents)*100).toFixed(2) })    
	});	

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const aggregate = await Libro.obtenerLibrosPorPublicado();

	data = [];

	aggregate.forEach((element, index, array) => {    	
    	data.push({
    		"publicado" : element._id, 
    		"total": element.total, 
    		"peso" : ((element.total/documents)*100).toFixed(2) })    
	});	

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorEditorial = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const aggregate = await Libro.obtenerLibrosPorEditorial();

	data = [];

	aggregate.forEach((element, index, array) => {    	
    	data.push({
    		"editorial" : element._id, 
    		"total": element.total, 
    		"peso" : ((element.total/documents)*100).toFixed(2) })    
	});	

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorIdioma = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const aggregate = await Libro.obtenerLibrosPorIdioma();

	data = [];

	aggregate.forEach((element, index, array) => {    	
    	data.push({
    		"idioma" : element._id, 
    		"total": element.total, 
    		"peso" : ((element.total/documents)*100).toFixed(2) })    
	});	

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorTemaPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const aggregate = await Libro.obtenerLibrosPorTemaPublicado();

	data = [];	
	
	aggregate.forEach((element, index, array) => {    	
    	data.push({
    		"tema" : element._id.tema, 
    		"publicado" : element._id.publicado, 
    		"total": element.total, 
    		"peso" : ((element.total/documents)*100).toFixed(2) })    
	});	

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorEditorialPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const aggregate = await Libro.obtenerLibrosPorEditorialPublicado();

	data = [];	
	
	aggregate.forEach((element, index, array) => {    	
    	data.push({
    		"editorial" : element._id.editorial, 
    		"publicado" : element._id.publicado, 
    		"total": element.total, 
    		"peso" : ((element.total/documents)*100).toFixed(2) })    
	});	

  	res.status(200).json({ success: true, count: documents, data });
};


