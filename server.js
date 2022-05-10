const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();

var corsOptions = {
  origin: "http://localhost:1337"
};

app.use(cors(corsOptions));
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 


//sequelize modellerne:
const db = require("./app/models");
const { brugere, produkter } = require("./app/models");





// Sync database, drop og remake databasen hvis allerede findes.
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

require("./app/routes/bruger.routes")(app);
require("./app/routes/produkt.routes")(app);


//brugere.destroy({where: {email: "test@test.com"}})
/*brugere.create({ email: "testmanden@test.com", password: "123", navn: "Jane", telefon: "24438798"});
produkter.create({ titel: "sej vare", beskrivelse: "123", pris: "orale", brugerId: 1});
*/

// Serve views folderen som static
app.use(express.static(path.join(__dirname, '/front-end/views/')))
// Serve public folderen som static
app.use(express.static(path.join(__dirname, '/front-end/public')))

// alle andre ruter
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/views/index.html'))
})*/


// lyt på porten efter requests
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server kører på port: ${PORT}.`);
});
