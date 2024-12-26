const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API conecttada');
});

app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/students', async (req, res) => {
  const { name, typeLicense } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO students (name, type_license) VALUES ($1, $2) RETURNING *',
      [name, typeLicense]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
