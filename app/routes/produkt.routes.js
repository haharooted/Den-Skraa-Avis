module.exports = app => {
    const produkter = require("../controllers/produkt.controller.js");
  
    var router = require("express").Router();
  
    // Get produkter
    router.get("/getprodukter", produkter.getProdukter);
    router.get("/getprodukterall", produkter.getProdukterAll);

  
    // Get produkter by kategori
    router.get("/getprodukterbykategori/", produkter.getProdukterByKategori);

    // Opret produkt
    router.post("/", produkter.createProdukt);
    router.put("/", produkter.updateProdukt);

    router.get("/deleteprodukt/:id", produkter.delete);

    router.get("/followProdukt", produkter.followProdukt);
    router.get("/unfollowProdukt", produkter.unfollowProdukt);
    router.get("/followedProdukt/:brugerId", produkter.followedProdukt);



    app.use('/api/produkter', router);
  };
  