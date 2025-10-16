const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const apiKey = "efd46ce32b1a4d35e84ab2ebc2dd3be3";


app.post("/city", (req, res) => {
    const city = req.body.cityName;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const info = JSON.parse(data);
            if (info.cod==200){
            const temp = info.main.temp;
            const desc = info.weather[0].description;
            const icon = info.weather[0].icon;
            const html= `<!DOCTYPE html>
                        <html lang="en">

                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Weather report</title>
                        </head>

                        <body>
                          <h1>${city}</h1>
                          <p>Temperature: ${temp} °C</p>
                          <p>Weather: ${desc} <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></p>
                          <a href="/">Volver</a>

                        </body>

                        </html>`;
            res.send(html);
          } else {res.send(`<p>Ciudad no encontrada: ${city}</p><a href="/">Volver</a>`);}
        });

      }).on("error", (err) => {
          console.error("Error en la petición HTTPS:", err);
          res.send("Error consultando la API");
      });
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});
