module.exports = app => {
  const brugere = require("../controllers/bruger.controller.js");

  let router = require("express").Router();

  // Find bruger ud fra id og returner data
  router.get("/checkbruger/:id", brugere.findOne);


  router.post("/", brugere.createBruger);
  router.post("/updatebruger", brugere.updateBruger);

  // Slet bruger ud fra id
  router.delete("/deletebruger/:id", brugere.deleteBruger);

  // Find alle brugere med date descending
  router.get("/findAllDateDesc", brugere.findAllDateDesc);

  // Login bruger
  router.post("/brugerlogin", brugere.brugerLogin);

  // Find alle brugere
  router.get("/findAllBrugere", brugere.findAllBrugere);

  // Find 1 bruger ud fra id
  router.get("/:id", brugere.findOne);

  // Opdater bruger med id
  router.put("/:id", brugere.updateBruger);

  // Delete a Bruger with id
  router.get("/sletbruger/:id", brugere.deleteBruger);

  // Upgrade user
  router.get("/upgradeBruger/:id", brugere.upgradeBruger);

  // Downgrade user
  router.get("/degradeBruger/:id", brugere.degradeBruger);

  app.use('/api/brugere', router);
};
