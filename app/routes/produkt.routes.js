module.exports = app => {
    const produkter = require("../controllers/produkt.controller.js");
  
    var router = require("express").Router();
  
    // Get produkter
    router.get("/getprodukter", produkter.getProdukter);
  
    // Get produkter by kategori
    router.get("/getprodukterbykategori/:kategori", produkter.getProdukterByKategori);

    // Opret produkt
    router.post("/", produkter.createProdukt);
    //router.put("/", produkter.updateProdukt);

    app.use('/api/produkter', router);
  };
  