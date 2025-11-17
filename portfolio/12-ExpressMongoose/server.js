const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const fs = require("fs");
const csv = require("csv-parser");

//connect to MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

async function loadData(req,res,next){

fs.createReadStream("public/data/f1_2023.csv")
  .pipe(csv())
  .on("data", async (row) => {

    try {
      
      let team = await Team.findOneAndUpdate(
      { name: row.current_team },
      { $setOnInsert: { id: null, nationality: null, url: null } },
      { upsert: true, new: true }
      );

      const [day, month, year] = row.dob.split("/").map(Number);//parses date
      const dob =new Date(year, month - 1, day);

       const cleanRow = {};//number has BOM issue and the schema didn't recognized it as number, so we clean the keys.
      for (const key in row) {
        const cleanKey = key.replace(/^\uFEFF/, '');
        cleanRow[cleanKey] = row[key];
      }
      const num = Number(cleanRow.number);
      
      const driver = new Driver({//creates driver obj
  
        num: num || null,
        code: row.code || null,
        forename: row.forename || null,
        surname: row.surname || null,
        dob: dob || null,
        nationality: row.nationality || null,
        url: row.url || null,           
        team: team,

      });

      const existingDriver = await Driver.findOne({ num: driver.num });//checks if driver already exists
        if (!existingDriver) {//if not, saves driver
        await driver.save();
      }

    } catch (err) {
      console.error("Error al guardar:", err);
    }
  })
    .on("end", () => {
    console.log("CSV procesado completamente");
    next();
  });

}

app.get("/driver", async (req, res) => {

  try{

    const editing = req.query.editing === "true";

    if (editing) {

      const teamObj = await Team.findOne({ name: req.query.team });

        await Driver.findOneAndUpdate(

          { num: req.query.num }, 
            {
                code: req.query.code,
                forename: req.query.name,
                surname: req.query.lname,
                dob: req.query.dob,
                nationality: req.query.nation,
                url: req.query.url,
                team: teamObj || null
            }
        );

        console.log("Driver actualizado");
        return res.redirect("/");
        

    } else{

  let teamObj = await Team.findOne({ name: req.query.team });

      if (!teamObj) {
      teamObj= new Team({//creates team obj
          id: null,
          name: req.query.team || null,
          nationality: null,
          url: null,

      });
      await teamObj.save();
    }

      let driver= await Driver.findOne({ num: req.query.num});
      
      if (!driver) {
      driver = new Driver({//creates driver obj
        
        num: req.query.num || null,
        code: req.query.code || null,
        forename: req.query.name || null,
        surname: req.query.lname || null,
        dob: req.query.dob || null,
        nationality: req.query.nation || null,
        url: req.query.url || null,           
        team: teamObj,

      });

      await driver.save();
      }
      else{
        console.log("El conductor ya existe en la BD");
        res.redirect("/");  
      }

  console.log("Usuario guardado en la BD");
  res.redirect("/");

}
} catch (err) {
  console.error("Error al guardar:", err);
  res.redirect("/");
}

});

app.get("/", loadData,async (req, res) => {
  const drivers = await Driver.find().lean();
  const teams = await Team.find().lean();
  res.render("index", { countries: countries, teams: teams, drivers: drivers });
});


app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});