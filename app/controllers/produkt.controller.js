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
// Create and Save a new produkt
exports.createProdukt = (req, res) => {
  
  let billedeFil = req.files.billedeFil;
  let uploadSti;
  
  
  // Validate request
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
  
  
  // Flyt billede til uploads folderen (/public/uploads)
  
  
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
  
  let billedeFil = req.files.billedeFil;
  let uploadSti;
  
  
  // Validate request
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
    id: req.body.id
  };
  
  // Flyt billede til uploads folderen (/public/uploads)
  
  
  // Save Produkt in the database
  Produkt.create(produkt)
  .then(data => {
    billedeFil.mv(uploadSti, function(fejl) {
      if (fejl) {
        return res.status(500).send(fejl);
      } else {
        res.status(200).send('Annonce er lagt op!');
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
  `, { type: QueryTypes.SELECT })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(400).send("Der skete en fejl: " + err)
  })
}
//get alle produkter
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

// get produkter by kategori
exports.getProdukterByKategori = (req, res) => {
  
  
  const inputKategori = req.query.kategori;
  const inputLokation = req.query.lokation;
  
  if(inputKategori == 0 && inputLokation != 0) {
    /*db.sequelize.query(`
    SELECT *
    FROM produkts
    LEFT JOIN brugers
    ON produkts.brugerId = brugers.id
    WHERE brugers.lokationId = ${inputLokation}
    `, { type: QueryTypes.SELECT })*/
    db.sequelize.query(`
    SELECT b.id as bruger_id, b.email, b.password, b.navn, b.telefon, b.is_guldbruger, b.createdAt, b.updatedAt, l.lokation, p.id as produkt_id, p.titel, p.pris, p.beskrivelse, p.billedeUrl, p.createdAt, p.updatedAt, p.brugerId, k.kategori
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
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send("Der skete en fejl: " + err)
    })
  }; 

  if(inputKategori == 0 && inputLokation == 0) {
    Produkt.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Der skete en fejl ved at fetche produkter."
      });
    });
  } 

  if(inputKategori != 0 && inputLokation == 0) {
    Produkt.findAll({where: {kategoriId: inputKategori}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Der skete en fejl ved at fetche produkter."
      });
    });
  } else {
    res.send("fejl")
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



// Retrieve all Produkter from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  Produkt.findAll({ where: condition })
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

// Find a single Produkt with an id
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

// Update a Produkt by the id in the request
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

// Delete a Produkt with the specified id in the request
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

// Delete all Produkter from the database.
exports.deleteAll = (req, res) => {
  Produkt.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Produkter were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all produkter."
    });
  });
};

// find all published Produkt
exports.findAllPublished = (req, res) => {
  Produkt.findAll({ where: { published: true } })
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
