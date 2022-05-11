module.exports = app => {
  const brugere = require("../controllers/bruger.controller.js");

  let router = require("express").Router();

  // Find bruger by id og returner data
  router.get("/checkbruger/:id", brugere.findOne);


  router.post("/", brugere.createBruger);
  router.put("/", brugere.updateBruger);

  // Delete bruger by id
  router.delete("/deletebruger/:id", brugere.deleteBruger);

  // Get bruger by email
  router.get("/getbrugerbyemail/:email", brugere.getBrugerByEmail);

  // Slet bruger by email
  router.delete("/deleteBrugerWithEmail/:email", brugere.deleteBrugerWithEmail);

  // Find alle brugere med date descending
  router.get("/findAllDateDesc", brugere.findAllDateDesc);

  // Login bruger
  router.post("/brugerlogin", brugere.brugerLogin);



  // Retrieve all published Brugere
  router.get("/findAllBrugere", brugere.findAllBrugere);

  // Retrieve a single Bruger with id
  router.get("/:id", brugere.findOne);

  // Update a Bruger with id
  router.put("/:id", brugere.updateBruger);

  // Delete a Bruger with id
  router.get("/sletbruger/:id", brugere.deleteBruger);

  // Upgrade user
  router.get("/upgradeBruger/:id", brugere.upgradeBruger);

  // Upgrade user
  router.get("/degradeBruger/:id", brugere.degradeBruger);

  // Delete all Brugere
  router.delete("/", brugere.deleteAll);

  app.use('/api/brugere', router);
};
