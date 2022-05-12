const db = require("../models");
const Produkt = db.produkter;
const Op = db.Sequelize.Op;
const fileUpload = require('express-fileupload');
const path = require('path');
const { brugere, produkter, kategorier } = require("../models");
const {QueryTypes} = require('sequelize');
const { REPL_MODE_SLOPPY } = require("repl");




// Follow produkt - indsæt i m:m junction table at bruger følger annonce
// Input -> req.query.brugerId, req.query.produkt.Id 
exports.followProdukt = (req, res) => {
  let brugerId = req.query.brugerId
  let produktId = req.query.produktId

  // Indsæt ny relation i db
  db.sequelize.query(`INSERT INTO brugere2produkters (brugerId, produktId) 
  VALUES (${brugerId}, ${produktId})`, { type: QueryTypes.INSERT })
  .then(data => {
    res.status(200).send("Du følger nu annoncen!")
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl ved at følge annoncen")
  })
};

exports.unfollowProdukt = (req, res) => {
  let brugerId = req.query.brugerId
  let produktId = req.query.produktId
  
  // Indsæt ny relation i db
  db.sequelize.query(`DELETE FROM brugere2produkters WHERE brugerId = ${brugerId} AND produktId = ${produktId}`, { type: QueryTypes.DELETE })
  .then(data => {
    res.send("Du følger nu ikke annoncen mere!")
  })
  .catch(err => {
    res.send("Der skete en fejl ved at unfollow annoncen")
  })
};

exports.followedProdukt = (req, res) => {
  let brugerId = req.params.brugerId
  
  // Indsæt query  i db
  db.sequelize.query(`
  SELECT *
  FROM brugere2produkters as bp
  LEFT JOIN produkts as p
  on bp.produktId = p.id
  WHERE bp.brugerId = ${brugerId} 
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(401).send("Der skete en fejl ved at fetche brugerens fulgte varer. Ingen fulgte varer?")
  })
};
// Nyt produkt
exports.createProdukt = (req, res) => {
  
  let billedeFil = req.files.billedeFil;
  let uploadSti;

  // Valider
  if (!req.body) {
    res.status(400).send({
      message: "Body kan ikke være tom!"
    });
    return;
  }
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Venligst vedhæft et billede af din vare.');
  }
  // Brug md5 hash til filnavngivning og definer uploadSti og billedeUrl
  let md5Hash = billedeFil.md5
  let extension = path.extname(billedeFil.name)
  uploadSti = './front-end/public/uploads/' + md5Hash + extension;
  const billedeUrl = md5Hash + extension
  const produkt = {
    titel: req.body.titel,
    pris: req.body.pris,
    beskrivelse: req.body.beskrivelse,
    billedeUrl: billedeUrl,
    kategoriId: req.body.kategori
  };
  let id = req.body.id  
  
  // Save Produkt in the database
  Produkt.create({
    titel: produkt.titel, 
    pris: produkt.pris, 
    beskrivelse: produkt.beskrivelse, 
    billedeUrl: produkt.billedeUrl,
    brugerId: id,
    kategoriId: produkt.kategoriId

  }, {
  })
  .then(data => {
    billedeFil.mv(uploadSti, function(fejl) {
      if (fejl) {
        return res.status(500).send(fejl);
      } else {
        res.status(200).send(`Annonce med titel: ${data.titel} er lagt op!`);
      }
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Der skete en fejl."
    });
  });
};

//Opdater produkt
exports.updateProdukt = (req, res) => {
  // Find ud af om produktet skal opdateres uden billede
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("Intet billede vedhæftet, brug original");
    let id = req.body.id
    const produkt = {titel: req.body.titel, pris: req.body.pris, billedeUrl: req.body.billedeUrl, 
      kategoriId: req.body.kategori, beskrivelse: req.body.beskrivelse, brugerId: req.body.brugerId}
      Produkt.update(produkt, {
        where: { id: id }
      })
      .then(
        res.send("Produkt opdateret: " + req.body.titel + " med beskrivelsen: " + req.body.beskrivelse)
      )
      .catch(err => {
        console.log(err)
        res.status(404)
      })
  } else {
    let billedeFil = req.files.billedeFil;
    let uploadSti;
    let md5Hash = billedeFil.md5
    let extension = path.extname(billedeFil.name)
    uploadSti = './front-end/public/uploads/' + md5Hash + extension;
    const billedeUrl = md5Hash + extension
    const produkt = {
      titel: req.body.titel,
      pris: req.body.pris,
      beskrivelse: req.body.beskrivelse,
      billedeUrl: billedeUrl,
      kategoriId: req.body.kategori,
      brugerId: req.body.brugerId
    };
    let id = req.body.id  
    
    // Gem produkt i databasen
    Produkt.create({
      titel: produkt.titel, 
      pris: produkt.pris, 
      beskrivelse: produkt.beskrivelse, 
      billedeUrl: produkt.billedeUrl,
      brugerId: id,
      kategoriId: produkt.kategoriId
  
    }, {
    })
    .then(data => {
      billedeFil.mv(uploadSti, function(fejl) {
        if (fejl) {
          return res.status(500).send(fejl);
        } else {
          res.send("Produkt opdateret: " + req.body.titel + " med beskrivelsen: " + req.body.beskrivelse)
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Der skete en fejl."
      });
    });
  };
};

// Alle produkter inkl. relationstabeller
exports.getProdukterAll = (req, res) => {
  db.sequelize.query(`
  SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori
FROM produkts as p
LEFT JOIN brugers as b
ON p.brugerId = b.id
LEFT JOIN lokations as l
ON b.lokationId = l.id
LEFT JOIN kategoris as k
ON p.kategoriId = k.id
ORDER BY is_guldbruger DESC
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl: " + err)
  })
}

exports.getprodukterallsortpris = (req, res) => {
  db.sequelize.query(`
  SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori
FROM produkts as p
LEFT JOIN brugers as b
ON p.brugerId = b.id
LEFT JOIN lokations as l
ON b.lokationId = l.id
LEFT JOIN kategoris as k
ON p.kategoriId = k.id
ORDER BY p.pris DESC
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl: " + err)
  })
}

exports.getprodukterallsortdate = (req, res) => {
  db.sequelize.query(`
  SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori
FROM produkts as p
LEFT JOIN brugers as b
ON p.brugerId = b.id
LEFT JOIN lokations as l
ON b.lokationId = l.id
LEFT JOIN kategoris as k
ON p.kategoriId = k.id
ORDER BY p.createdAt DESC
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl: " + err)
  })
}

exports.getprodukterallsorteditdate = (req, res) => {
  db.sequelize.query(`
  SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori
FROM produkts as p
LEFT JOIN brugers as b
ON p.brugerId = b.id
LEFT JOIN lokations as l
ON b.lokationId = l.id
LEFT JOIN kategoris as k
ON p.kategoriId = k.id
ORDER BY p.updatedAt DESC
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl: " + err)
  })
}

// Statistik
exports.getStats = (req, res) => {
  db.sequelize.query(`
  SELECT COUNT(produkters) as antal_annoncer, users.navn
            FROM products
            LEFT JOIN users
            ON products.oprettetAfId = users.uuid
            GROUP BY users.brugerId
            ORDER BY antal_annoncer DESC
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl: " + err)
  })
}
exports.getStatsUsers = (req, res) => {
  db.sequelize.query(`
  SELECT COUNT(id) AS antalBrugere FROM brugers
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.send(data)
    console.log(data)
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl: " + err)
  })
}

// Find produkter ud fra brugerid
exports.getProdukterByBrugerId = (req, res) => {
  Produkt.findAll({where: {brugerId: req.params.id}},
    {include: kategorier})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Der skete en fejl ved at finde brugere brugere."
    });
  });
}

// Get alle produkter
exports.getProdukter = (req, res) => {
  Produkt.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Der skete en fejl ved hentning af produkter."
    });
  });
};

// Get produkter by kategori & lokation
exports.getProdukterByKategori = (req, res) => {
  
  const inputKategori = req.params.kategori;
  const inputLokation = req.params.lokation;
  console.log("kategori: " + inputKategori + "lokation: " + inputLokation)

  if (inputKategori != 0 && inputLokation != 0) {
    db.sequelize.query(`
    SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, b.lokationId, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori, p.kategoriId
  FROM produkts as p
  LEFT JOIN brugers as b
  ON p.brugerId = b.id
  LEFT JOIN lokations as l
  ON b.lokationId = l.id
  LEFT JOIN kategoris as k
  ON p.kategoriId = k.id
  WHERE b.lokationId = ${inputLokation} AND p.kategoriId = ${inputKategori}
    `, { type: QueryTypes.SELECT })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400)
    })
  } 
  if (inputKategori == 0 && inputLokation != 0) {
    db.sequelize.query(`
    SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, b.lokationId, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori, p.kategoriId
  FROM produkts as p
  LEFT JOIN brugers as b
  ON p.brugerId = b.id
  LEFT JOIN lokations as l
  ON b.lokationId = l.id
  LEFT JOIN kategoris as k
  ON p.kategoriId = k.id
  WHERE b.lokationId = ${inputLokation}
    `, { type: QueryTypes.SELECT })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400)
    })
  } 
  if (inputKategori != 0 && inputLokation == 0) {
    db.sequelize.query(`
    SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, b.lokationId, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori, p.kategoriId
  FROM produkts as p
  LEFT JOIN brugers as b
  ON p.brugerId = b.id
  LEFT JOIN lokations as l
  ON b.lokationId = l.id
  LEFT JOIN kategoris as k
  ON p.kategoriId = k.id
  WHERE p.kategoriId = ${inputKategori}
    `, { type: QueryTypes.SELECT })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400)
    })
  } 
  if (inputKategori == 0 && inputLokation == 0) {
    db.sequelize.query(`
    SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, b.lokationId, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori, p.kategoriId
  FROM produkts as p
  LEFT JOIN brugers as b
  ON p.brugerId = b.id
  LEFT JOIN lokations as l
  ON b.lokationId = l.id
  LEFT JOIN kategoris as k
  ON p.kategoriId = k.id
    `, { type: QueryTypes.SELECT })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400)
    })
  } 


};

exports.getProdukterById = (req, res) => {
  const inputId = req.params.id;
  
  Produkt.findAll({ where: {id: id} })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving produkter."
    });
  });
};

// Find et produkt ud fra id (primary key)
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Produkt.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Produkt with id=" + id
    });
  });
};

// Opdater et produkt
exports.update = (req, res) => {
  const id = req.params.id;
  
  Produkt.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Produkt was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Produkt with id=${id}`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Produkt with id=" + id
    });
  });
};

// Slet et produkt ud fra id
exports.delete = (req, res) => {
  const id = req.params.id;
  
  Produkt.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Produkt slettet!"
      });
    } else {
      res.send({
        message: `Kan ikke slette produkt med id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Kunne ikke slette produkt med id=" + id
    });
  });
};