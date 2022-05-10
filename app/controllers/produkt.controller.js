const db = require("../models");
const Produkt = db.produkter;
const Op = db.Sequelize.Op;
const fileUpload = require('express-fileupload');
const path = require('path');
const { brugere, produkter } = require("../models");

// Nyt produkt:

// Create and Save a new Bruger
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
  console.log(billedeUrl)
  const produkt = {
    titel: req.body.titel,
    pris: req.body.pris,
    beskrivelse: req.body.beskrivelse,
    billedeUrl: billedeUrl,
  };
  let id = req.body.id


      // Flyt billede til uploads folderen (/public/uploads)

  
  // Save Produkt in the database
  console.log(id)
  Produkt.create({
    titel: produkt.titel, 
    pris: produkt.pris, 
    beskrivelse: produkt.beskrivelse, 
    billedeUrl: produkt.billedeUrl,
    brugerId: id
  }, {
  })
  .then(data => {
    billedeFil.mv(uploadSti, function(fejl) {
      if (fejl) {
        return res.status(500).send(fejl);
      } else {
        res.status(200).send(`Annonce med titel: ${data.toJSON().titel} er lagt op!`);
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
  console.log(billedeUrl)
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
    console.log("save produkt: " + data)
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
  const inputKategori = req.params.kategori;
  
  Produkt.findAll({ where: {kategori: inputKategori} })
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
        message: "Produkt was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Produkt with id=${id}. Maybe Produkt was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Produkt with id=" + id
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
