# REST API de recursos con NodeJs, Express y MongoDB


### Commit 2. 29-10-2019
* Se crean los modelos de temas, editoriales, fabricantes e idiomas.
* Se instala dotenv y morgan.
* Se configuran las variables de entorno NODE_ENV, MONGO_URI y PORT.
* Se configuran los scripts start y dev en el fichero package.json.
* La conexión a MongoDB queda configurado en el fichero db.js en la carpeta config.
* Se crean los middleware async.js y error.js. Con el primero evitamos sentencias try catch en los controladores.
* Se registrar en server.js el errorHandler global de la app.
* Se termina la implementacion del controlador de temas.
* Se termina la implementacion del controlador de idiomas.
* Se termina la implementacion del controlador de fabricantes.
* Se termina la implementacion del controlador de editoriales.

### Commit 1. 28-10-2019
* Se crea la estructura inicial del proyecto.
* Se crean las carpetas routes, controllers, models, config, test, seeds, utils y middleware.
* Se instala express y mongoose.
