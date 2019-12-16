
const config = require('config');

const PORT = config.get('port');

module.exports = function(app) {
	app.listen(PORT);  
	console.log(`Servidor iniciado en modo ${process.env.NODE_ENV} en el puerto ${PORT}`); 
}
