module.exports = app => {
  const brugere = require("../controllers/bruger.controller.js");

  var router = require("express").Router();

  // Lav ny bruger
  router.post("/createbruger", brugere.createBruger);

  // Følg produkt
  router.post("/brugerFollowProdukt", brugere.brugerFollowProdukt);

  // Find bruger by id og returner data
  router.get("/checkbruger/:id", brugere.findOne);

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
  router.get("/published", brugere.findAllPublished);

  // Retrieve a single Bruger with id
  router.get("/:id", brugere.findOne);

  // Update a Bruger with id
  router.put("/:id", brugere.updateBruger);

  // Delete a Bruger with id
  router.delete("/:id", brugere.deleteBruger);

  // Delete all Brugere
  router.delete("/", brugere.deleteAll);

  app.use('/api/brugere', router);
};
