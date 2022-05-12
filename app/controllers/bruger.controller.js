const db = require("../models");
const Bruger = db.brugere;
const Op = db.Sequelize.Op;

// Opret ny bruger i db
  exports.createBruger = (req, res) => {
    // Validér
    if (!req.body) {
      res.status(400).send({
        message: "Request skal have en body!"
      });
      return;
    }
      // Gem produkt i database
      // Bruger.create() opretter bare en INSERT SQL query automatisk (og validerer med modellen)
      const bruger = {
        email: req.body.email,
        password: req.body.password,
        navn: req.body.navn,
        telefon: req.body.telefon,
        lokationId: req.body.lokation
      };
        // Save Produkt in the database
        Bruger.create(bruger)
        .then(data => {
          res.send(data);
        })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Der skete en fejl ved oprettelse."
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

//Logind bruger
exports.brugerLogin = (req, res) => {
  const bruger = {
    email: req.body.email,
    password: req.body.password
  };

  Bruger.findOne({
    where: {
      email: bruger.email,
      password: bruger.password}
    })
  .then(data => {
    if (data == null) {
      res.status(400)
    } else {
      res.status(200).send(data)
    }
  })
  .catch(err => {
    res.status(400).send(err)
  });
};

// Find en bruger med ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Bruger.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Fejl ved at finde bruger med id=" + id
    });
  });
};
exports.findOneAdmin = (req, res) => {
  const id = req.params.id;
  Bruger.findOne({where: {
    id: id,
    is_Admin: true
  }})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send(false)
    });
};

// Find bruger med en email
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

// Slet bruger kun med en email
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

// Opdater en bruger ud fra id i request
exports.updateBruger = (req, res) => {
  const bruger = {
    email: req.body.email,
    password: req.body.password,
    navn: req.body.navn,
    telefon: req.body.telefon,
    lokationId: req.body.lokation
  };
  console.log(bruger)
  let id = req.body.id
  Bruger.update(bruger, {
    where: { id: id }
  })
  .then(num => {
    console.log("num: " + num)
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
      message: "Fejl ved at opdatere id=" + id + err
    });
  });
};

//Opgrader bruger -> til gold
exports.upgradeBruger = (req, res) => {
  let id = req.params.id
  Bruger.update({
    is_Guldbruger: true
  }, {
    where: {id: id }
  })
  .then(svar => {
    if (svar == 1) {
      res.send({
        message: "Bruger blev upgraded."
      });
    } else {
      res.send({
        message: `Kan ikke upgrade bruger med id = ${id}`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Fejl ved at upgrade id=" + id
    });
  });
};

// Downgrade bruger til normalt medlem
exports.degradeBruger = (req, res) => {
  let id = req.params.id
  Bruger.update({
    is_Guldbruger: false
  }, {
    where: {id: id }
  })
  .then(svar => {
    if (svar == 1) {
      res.send({
        message: "Bruger blev downgraded."
      });
    } else {
      res.send({
        message: `Kan ikke downgrade bruger med id = ${id}`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Fejl ved at downgrade id=" + id
    });
  });
};

// Slet bruger med specifikt ID i params
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


// Find alle brugere
exports.findAllBrugere = (req, res) => {
  Bruger.findAll()
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
