const express = require('express');
const app = express();
const path = require('path');

app.use('/html', express.static(path.join(__dirname, 'html')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

const storedNames=[];

app.get ('/greet', (req, res) => {
    const nombre = req.query.name;
    if (!nombre) {
        return res.status(400).json({ error: 'No se recibió ningún nombre' });
    }
    storedNames.push(nombre);
    console.log(nombre);
    res.json(storedNames);

});

const tasks=[];
app.post('/task', (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.json({ newTask: task });
});


app.delete('/task/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    const removed = tasks.splice(index, 1); // elimina del arreglo
    res.json({ removed: removed[0] });
  }
});

app.get('/task', (req, res) => {
  res.json(tasks);
});

app.put('/greet', (req, res) => {
    const new_name = req.query.name;
        storedNames.push(new_name);
        res.json(storedNames);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

