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

exports.obtenerTutorialesPorTema = async (req, res, next) => {
	const documents = await Tutorial.countDocuments();
	const duration  = await Tutorial.obtenerDuracionTutoriales();
	const aggregate = await Tutorial.obtenerTutorialesPorTema();
	const totalMinutes = duration[0].duracion;	

	const data = [];
	
	aggregate.forEach((element) => {   
		const peso = documents == 0 ? 0 : (element.count / documents) * 100
    	const item = {
    		tema : element.tema,
    		duracion : element.duracion,
    		peso,
    		temas: element.count
    	}

    	data.push(item);    
	});

  	res.status(200).json({ success: true, count: documents, minutes: totalMinutes, data });
};

exports.obtenerTutorialesPorPublicado = async (req, res, next) => {
	const documents = await Tutorial.countDocuments();
	const duration  = await Tutorial.obtenerDuracionTutoriales();
	const aggregate = await Tutorial.obtenerTutorialesPorPublicado();	
	const totalMinutes = duration[0].duracion;	

	const data = [];
	
	aggregate.forEach((element) => {   
		const peso = documents == 0 ? 0 : (element.count / documents) * 100
    	const item = {
    		publicado : element.publicado,
    		duracion : element.duracion,
    		peso,
    		publicados: element.count
    	}

    	data.push(item);    
	});

  	res.status(200).json({ success: true, count: documents, minutes: totalMinutes, data });
};

exports.obtenerTutorialesPorIdioma = async (req, res, next) => {
	const documents = await Tutorial.countDocuments();
	const duration  = await Tutorial.obtenerDuracionTutoriales();
	const aggregate = await Tutorial.obtenerTutorialesPorIdioma();
	const totalMinutes = duration[0].duracion;	

	const data = [];
	
	aggregate.forEach((element) => {   
		const peso = documents == 0 ? 0 : (element.count / documents) * 100
    	const item = {
    		idioma : element.idioma,
    		duracion : element.duracion,
    		peso,
    		idiomas: element.count
    	}

    	data.push(item);    
	});

  	res.status(200).json({ success: true, count: documents, minutes: totalMinutes, data });
};

exports.obtenerTutorialesPorFabricante = async (req, res, next) => {
	const documents = await Tutorial.countDocuments();
	const duration  = await Tutorial.obtenerDuracionTutoriales();
	const aggregate = await Tutorial.obtenerTutorialesPorFabricante();
	const totalMinutes = duration[0].duracion;	

	const data = [];
	
	aggregate.forEach((element) => {   
		const peso = documents == 0 ? 0 : (element.count / documents) * 100
    	const item = {
    		fabricante : element.fabricante,
    		duracion : element.duracion,
    		peso,
    		fabricantes: element.count
    	}

    	data.push(item);    
	});

  	res.status(200).json({ success: true, count: documents, minutes: totalMinutes, data });
};

exports.obtenerTutorialesPorTemaPublicado = async (req, res, next) => {
	const documents = await Tutorial.countDocuments();
	const duration  = await Tutorial.obtenerDuracionTutoriales();
	const data = await Tutorial.obtenerTutorialesPorTemaPublicado();
	const totalMinutes = duration[0].duracion;	

  	res.status(200).json({ success: true, count: documents, minutes: totalMinutes, data });
};

exports.obtenerTutorialesPorTemaFabricante = async (req, res, next) => {
	const documents = await Tutorial.countDocuments();
	const duration  = await Tutorial.obtenerDuracionTutoriales();
	const data = await Tutorial.obtenerTutorialesPorTemaFabricante();
	const totalMinutes = duration[0].duracion;	

  	res.status(200).json({ success: true, count: documents, minutes: totalMinutes, data });
};

exports.obtenerTutorialesPorTemaIdioma = async (req, res, next) => {
	const documents = await Tutorial.countDocuments();
	const duration  = await Tutorial.obtenerDuracionTutoriales();
	const data = await Tutorial.obtenerTutorialesPorTemaIdioma();
	const totalMinutes = duration[0].duracion;	

  	res.status(200).json({ success: true, count: documents, minutes: totalMinutes, data });
};
