# REST API de recursos con NodeJs, Express y MongoDB


### Commit 11. 18-11-2019
* Se crean los test de libros.

### Commit 10. 14-11-2019
* Se crean los modelos de libros y turoriales.
* Se crea el controlador de libros y las rutas de libros.

### Commit 9. 13-11-2019
* Se crean los tests de enlaces.

### Commit 8. 11-11-2019
* Se crea el modelo de enlaces.
* Se crea el controlador de enlaces y las rutas.
* Se actualiza server.js

### Commit 7. 5-11-2019
* Se instalan los paquetes jsonwebtoken y bcryptjs.
* Se crea el modelo de usuario.
* Se crea el controlador y ruta auth.
* Se crea el registro del usuario con encriptación de contraseña.
* Se crea la ruta login.
* Se crea el middleware protect, para proteger el acceso a las rutas.
* Se crea la ruta /auth/me y su función getMe.
* Se crea la función isRole para autorizar el acceso a las rutas a determinados roles.

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
