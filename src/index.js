// Express sirve para iniciar el server, darle propiedades y declarar rutas.
const express = require('express');
// Express session sirve para crear una sesión que se pueda guardar cuando el usuario entre a su cuenta.
// Tipo para mantener la sesión iniciada.
const session = require('express-session');
/*
Cors permite que puedas hacer llamadas de entidades no seguras, normalmente solo pueden
hacer llamadas de sitios seguros que inicient con https, pero esto relaja la seguridad
para que no tengas problemas durante el desarrollo.
*/
const cors = require('cors');
// Está invocando al archivo local db para ser usado.
const db = require('./db');
// Está invocando a los archivos locales de rutas para que express los acepte y puedas hacer llamadas.
const userRoutes = require('./routes/user.routes');
const fileRoutes = require('./routes/file.routes');
// Inicializa la variable express para crear una aplicación funcional.
const app = express();
// Esto configura el acceso a las variables de entorno, digamos que crea la variable 'process'
require('dotenv').config();

// Indica a la aplicación que use el módulo cors.
app.use(cors());

// Se establece la conección con el archivo local db, y checha si hay un problema.
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Si todo va bien, esto lanza un mensaje en la consola diciendo que te conectaste.
db.once('open', () => console.log('Connected to MongoDB'));

// Esto indica a la app que va a estar usando json para que lo pueda leer y convertir.
app.use(express.json());
// Esto configura el módulo express-session, para las sesiones de usuario.
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

// Esto configura las rutas para que sean accesibles desde la app y puedas llamarlas (desde postman, por ejemplo).
app.use('/user', userRoutes);
app.use('/file', requireUser, fileRoutes);

// Esta función es un middleware que verifica que el usuario haya iniciado sesión,
// si no ha iniciado, la llamada a la ruta se rechaza y no podrás acceder.
function requireUser(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  req.user = req.session.user;
  next();
}

// Esto inicia al server como tal y lo manda al puerto 3000 y hagas llamadas al http://localhost:3000.
// No hay problema si cambias el puesto, puede ir en el que sea.
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
