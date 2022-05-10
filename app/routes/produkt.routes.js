module.exports = app => {
    const produkter = require("../controllers/produkt.controller.js");
  
    var router = require("express").Router();
  
    // Get produkter
    router.get("/getprodukter", produkter.getProdukter);
  
    // Get produkter by kategori
    router.get("/getprodukterbykategori/:kategori", produkter.getProdukterByKategori);
  
    app.use('/api/produkter', router);
  };
  