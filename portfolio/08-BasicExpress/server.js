const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get ('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  const bmi = (weight / (height * height)) * 10000;

  res.send(`Tu BMI es ${bmi.toFixed(2)}`);
});

app.listen(3000);