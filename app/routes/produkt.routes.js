module.exports = app => {
    const produkter = require("../controllers/produkt.controller.js");
  
    var router = require("express").Router();
  
    // Get produkter
    router.get("/getprodukter", produkter.getProdukter);

    // Get produkter inkl. kategori, og lokation med Guldbruger ORDER BY
    router.get("/getprodukterall", produkter.getProdukterAll);
    router.get("/getprodukterbybrugerid/:id", produkter.getProdukterByBrugerId);

    // Sort
    router.get("/getprodukterallsortpris", produkter.getprodukterallsortpris);
    router.get("/getprodukterallsortdate", produkter.getprodukterallsortdate);
    router.get("/getprodukterallsorteditdate", produkter.getprodukterallsorteditdate);

    // Find alle produkter der passer til kategori og lokation
    router.get("/getprodukterbykategori/:kategori/:lokation", produkter.getProdukterByKategori);

    // Opret og opdater produkt
    router.post("/", produkter.createProdukt);
    router.put("/", produkter.updateProdukt);
    router.post("/updateprodukt", produkter.updateProdukt);
    router.get("/deleteprodukt/:id", produkter.delete);

    // Følg produkt, unfollow produkt
    router.get("/followProdukt", produkter.followProdukt);
    router.get("/unfollowProdukt", produkter.unfollowProdukt);
    // Find alle produkter der er fulgt af et brugerID
    router.get("/followedProdukt/:brugerId", produkter.followedProdukt);

    // Statistik
    router.get("/getstatsusers", produkter.getStatsUsers);
    router.get("/produktstats", produkter.produktstats);



    app.use('/api/produkter', router);
  };
  