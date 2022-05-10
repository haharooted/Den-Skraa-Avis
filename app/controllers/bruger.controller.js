const db = require("../models");
const Bruger = db.brugere;
const Op = db.Sequelize.Op;

// Create and Save a new Bruger
exports.createBruger = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  
  const bruger = {
    email: req.body.email,
    password: req.body.password,
    navn: req.body.navn,
    telefon: req.body.telefon
  };

    // Save Produkt in the database
    Bruger.create(bruger)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Der skete en fejl."
      });
    });
  };



// Retrieve all Brugere from the database date descending
exports.findAllDateDesc = (req, res) => {
  Bruger.findAll({ order: [['createdAt', 'DESC']]})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving brugere."
    });
  });
};

// Retrieve all Brugere from the database date descending
exports.brugerLogin = (req, res) => {
  const bruger = {
    email: req.body.email,
    password: req.body.password
  };

  console.log("input: " + bruger)
  Bruger.findOne({
    where: {
      email: bruger.email,
      password: bruger.password}
    })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  });
};

// Find a single Bruger with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Bruger.findByPk(id)
  .then(data => {
    res.send(data);
    console.log(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({
      message: "Fejl ved at finde bruger med id=" + id
    });
  });
};

// Find bruger with an email
exports.getBrugerByEmail = (req, res) => {
  const inputEmail = req.params.email;
  Bruger.findAll({ where: {email: inputEmail}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Der skete en fejl ved at hente bruger."
    });
  });
};

// Delete bruger with an email

exports.deleteBrugerWithEmail = (req, res) => {
  const inputEmail = req.params.email;
  
  Bruger.destroy({
    where: { email: inputEmail }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Bruger blev slettet!"
      });
    } else {
      res.send({
        message: `Kan ikke slette bruger med id=${inputEmail}. Måske er brugeren ikke fundet?`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Kunne ikke slette bruger med id=" + id
    });
  });
};

// Update a Bruger by the id in the request
exports.brugerFollowProdukt = (req, res) => {
  const inputBrugerId = req.params.brugerId
  const inputProduktId = req.params.produktId


  brugere2produkter.create({
    brugerId: inputBrugerId,
    produktId: inputProduktId
  })


  Bruger.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Bruger blev opdateret."
      });
    } else {
      res.send({
        message: `Kan ikke opdatere bruger med id=${id}`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Fejl ved at opdatere id=" + id
    });
  });
};

exports.updateBruger = (req, res) => {
  const bruger = {
    email: req.body.email,
    password: req.body.password,
    navn: req.body.navn,
    telefon: req.body.telefon
  };
  
  Bruger.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Bruger blev opdateret."
      });
    } else {
      res.send({
        message: `Kan ikke opdatere bruger med id=${id}`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Fejl ved at opdatere id=" + id
    });
  });
};

// Delete a Bruger with the specified id in the request
exports.deleteBruger = (req, res) => {
  const id = req.params.id;
  
  Bruger.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Bruger blev slettet!"
      });
    } else {
      res.send({
        message: `Kan ikke slette bruger med id=${id}. Måske er brugeren ikke fundet?`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Kunne ikke slette bruger med id=" + id
    });
  });
};

// Delete all Brugere from the database.
exports.deleteAll = (req, res) => {
  Bruger.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Brugere were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all brugere."
    });
  });
};

// find all published Bruger
exports.findAllPublished = (req, res) => {
  Bruger.findAll()//{ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving brugere."
    });
  });
};
