const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modeller
db.brugere = require("./bruger.model.js")(sequelize, Sequelize);
db.produkter = require("./produkt.model.js")(sequelize, Sequelize);
db.lokationer = require("./lokation.model.js")(sequelize, Sequelize);
db.kategorier = require("./kategori.model")(sequelize, Sequelize);

// Bruger <> Produkter
db.brugere.hasMany(db.produkter, {
  Delete: 'CASCADE',
  foreignKey: {allowNulls: false},
});
db.produkter.belongsTo(db.brugere);

// Lokationer -> Brugere
db.lokationer.hasMany(db.brugere, {
  foreignKey: {allowNulls: false},
  hooks: true
});
db.brugere.belongsTo(db.lokationer);

db.kategorier.hasMany(db.produkter, {
  foreignKey: {allowNulls: false},
  hooks: true
});
db.produkter.belongsTo(db.kategorier);

// Mange til mange for at holde øje med at brugere kan følge produkter

db.sequelize.define('brugere2produkters', {

}, {timestamps: false});

db.brugere.belongsToMany(db.produkter, {through: 'brugere2produkters'})
db.produkter.belongsToMany(db.brugere, {through: 'brugere2produkters'})
module.exports = db;



