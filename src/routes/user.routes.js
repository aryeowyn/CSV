const express = require('express');
// bcrypt se usa para encriptar las contraseñas
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const router = express.Router();

// Ruta para registrar al usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json({ message: 'Missing data' });
  }
  
  // Las rondas son cuantas veces va a pasar por el proceso de encriptación digamos,
  // a más rondas, más segura se encripta la contraseña, pero más lenta se vuelve tu respuesta.
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  // Aquí se crea el usuario basado en el modelo de la tabla, se tiene que pasar toda data
  // tal cual es nombrada en el archivo user.model.js
  const user = new User({ name, email, password: passwordHash });

  // Esto es lo que guarda el usuario en la base de datos, si todo es correcto se guardará.
  try {
    await user.save();
    req.session.user = user;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save user' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!email || !password) {
    return res.status(401).json({ message: 'Missing email or password' });
  }
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  req.session.user = user;
  res.json(user);
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
