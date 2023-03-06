const express = require('express');
// Esto es para convertir csv a json y guardarlo en la base de datos.
const csvtojson = require('csvtojson');

const File = require('../models/file.model');

const router = express.Router();

router.post('/', async (req, res) => {
  const { originalname, buffer } = req.file;
  if (!originalname || !buffer) res.json('No name or file');
  
  const json = await csvtojson().fromString(buffer.toString());
  const file = new File({ name: originalname, content: json, user: req.user });

  try {
    await file.save();
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save file' });
  }
});

router.get('/:id', async (req, res) => {
  const file = await File.findOne({ _id: req.params.id, user: req.user });

  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }

  res.json(file);
});

module.exports = router;
