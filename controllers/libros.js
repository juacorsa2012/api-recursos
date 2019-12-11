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
	const libros  = await Libro.countDocuments();
	const paginas = await Libro.obtenerPaginas();
	const totalPaginas = paginas[0].paginas

  	res.status(200).json({ success: true, libros, paginas: totalPaginas });
});

exports.obtenerLibrosPorTema = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const data = await Libro.obtenerLibrosPorTema();

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const data = await Libro.obtenerLibrosPorPublicado();

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorEditorial = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const data = await Libro.obtenerLibrosPorEditorial();

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorIdioma = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const data = await Libro.obtenerLibrosPorIdioma();

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorTemaPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const data = await Libro.obtenerLibrosPorTemaPublicado();

  	res.status(200).json({ success: true, count: documents, data });
};

exports.obtenerLibrosPorEditorialPublicado = async (req, res, next) => {
	const documents = await Libro.countDocuments();
	const data = await Libro.obtenerLibrosPorEditorialPublicado();

  	res.status(200).json({ success: true, count: documents, data });
};



	/*
	data = [];	
	
	aggregate.forEach((element, index, array) => {    	
    	data.push({
    		"editorial" : element._id.editorial, 
    		"publicado" : element._id.publicado, 
    		"total": element.total, 
    		"peso" : ((element.total/documents)*100).toFixed(2) })    
	});	*/