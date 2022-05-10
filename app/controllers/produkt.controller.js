const db = require("../models");
const Produkt = db.produkter;
const Op = db.Sequelize.Op;

//getprodukterbykategori


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



// Create produkt 
exports.createProdukt = (req, res) => {
  return Produkt.create({
    title: tutorial.title,
    description: tutorial.description,
  })
    .then((tutorial) => {
      console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while creating tutorial: ", err);
    });
};

// Create and Save a new Produkt
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Produkt
  const produkt = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Produkt in the database
  Produkt.create(produkt)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Produkt."
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
