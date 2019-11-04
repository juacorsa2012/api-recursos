# REST API de recursos con NodeJs, Express y MongoDB



### Commit 6. 4-11-2019
* Se crea el middleware advancedQuery para la gestión de los parámetros de las rutas GET.

### Commit 5. 1-11-2019
* Se terminan los tests de las editoriales.
* Se terminan los tests de los fabricantes.

### Commit 4. 31-10-2019
* Se terminan los tests de los temas.
* Se terminan los tests de los idiomas.

### Commit 3. 30-10-2019
* Se crea el seeder de temas, editoriales, fabricantes e idiomas.
* Se instala mocha, chai, chai-http y supertest en mode -D
* Se instala config para la gestión de las variables de entorno. Descartamos dotenv.
* Las variables de entorno quedan definidas en los ficheros development .js y production .js.
* OJO, con el espacio entre el nombre la extensón.
* Se desinstala dotenv.
* Se inician los temas de los temas.

### Commit 2. 29-10-2019
* Se crean los modelos de temas, editoriales, fabricantes e idiomas.
* Se instala dotenv y morgan.
* Se configuran las variables de entorno NODE_ENV, MONGO_URI y PORT.
* Se configuran los scripts start y dev en el fichero package.json.
* La conexión a MongoDB queda configurado en el fichero db.js en la carpeta config.
* Se crean los middleware async.js y error.js. Con el primero evitamos sentencias try catch en los controladores.
* Se registrar en server.js el errorHandler global de la app.
* Se termina la implementación del controlador de temas.
* Se termina la implementación del controlador de idiomas.
* Se termina la implementación del controlador de fabricantes.
* Se termina la implementación del controlador de editoriales.

### Commit 1. 28-10-2019
* Se crea la estructura inicial del proyecto.
* Se crean las carpetas routes, controllers, models, config, test, seeds, utils y middleware.
* Se instala express y mongoose.
