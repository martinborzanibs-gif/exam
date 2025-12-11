'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS para que freeCodeCamp pueda testear
app.use(cors({ optionsSuccessStatus: 200 }));

// Servir archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta de prueba que usan los tests de FCC
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Endpoint principal: /api/:date?
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // Sin parámetro -> fecha actual
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // Solo números -> lo tratamos como unix en milisegundos
    const unixMillis = parseInt(dateParam, 10);
    date = new Date(unixMillis);
  } else {
    // Intentamos parsear como fecha tipo 2015-12-25
    date = new Date(dateParam);
  }

  // Validar fecha
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Respuesta correcta
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Levantar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Timestamp Microservice listening on port ' + port);
});

module.exports = app;
