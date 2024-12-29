const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:5173' }));

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
  const { name, type_license } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query(
      'INSERT INTO students (name, type_license) VALUES ($1, $2) RETURNING *',
      [name, type_license]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/classes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM classes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/classes', async (req, res) => {
  const { name, type } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO classes (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
      const result = await pool.query(
          `SELECT * FROM students WHERE id = $1`,
          [studentId]
      );
      if (result.rows.length === 0) {
          return res.status(404).send('Estudante não encontrado');
      }
      res.json(result.rows[0]);
  } catch (err) {
      res.status(500).send('Erro ao buscar os detalhes do estudante');
  }
});


app.get('/students/:studentId/classes', async (req, res) => {
  const { studentId } = req.params;

  try {
      const result = await pool.query(
          `
          SELECT sc.id, sc.status, sc.class_id, c.name
          FROM student_classes sc
          JOIN classes c ON sc.class_id = c.id
          WHERE sc.student_id = $1
          `,
          [studentId]
      );

      res.json(result.rows);
  } catch (err) {
      res.status(500).send(err.message);
  }
});


app.post('/students/:studentId/classes', async (req, res) => {
  const { studentId } = req.params;
  const { classId } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO student_classes (student_id, class_id, status)
      VALUES ($1, $2, 'Não Iniciado')
      RETURNING id, student_id, class_id, status
      `,
      [studentId, classId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/students/:studentId/classes/:classId', async (req, res) => {
  const { studentId, classId } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE student_classes
      SET status = $1
      WHERE student_id = $2 AND class_id = $3
      RETURNING id, student_id, class_id, status
      `,
      [status, studentId, classId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Aula não encontrada para o estudante.');
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
