const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
const fileUpload = require("express-fileupload");



// Cors indstillinger
var corsOptions = {
  origin: "*"
};

// Express Middleware 
app.use(cors(corsOptions));
app.use(express.json());  
app.use(fileUpload());

// Bruges i stedet for body-parser
app.use(express.urlencoded({ extended: true })); 


// Sequelize modellerne:
const db = require("./app/models");
const { brugere, produkter, lokationer, kategorier } = require("./app/models");





// Sync database, drop og remake databasen hvis allerede findes.
// Hvis db skal laves fra ny - så uncomment nedestående:
db.sequelize.sync()//{force: true})
/*.catch(function() {
  db.sequelize.query(`DROP TABLE brugere2produkter`)
  .then(function() {
     db.sequelize.query(`DROP TABLE produkts`)
  })
  .then(function() {
     db.sequelize.query(`DROP TABLE brugers`)
  })
})*/


// Require vores routes
require("./app/routes/bruger.routes")(app);
require("./app/routes/produkt.routes")(app);

// Serve views folderen som static
app.use(express.static(path.join(__dirname, '/front-end/views/')))
// Serve public folderen som static
app.use(express.static(path.join(__dirname, '/front-end/public')))

// Alle andre ruter redirectes til index.html
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/views/index.html'))
})*/


// Lyt på porten efter requests
const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Server kører på port: ${PORT}.`);
});
