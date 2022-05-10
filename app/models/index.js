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

db.brugere = require("./bruger.model.js")(sequelize, Sequelize);
db.produkter = require("./produkt.model.js")(sequelize, Sequelize);
db.brugere.hasMany(db.produkter, {
  onDelete: 'CASCADE',
  foreignKey: {allowNulls: false},
  hooks: true
});
db.produkter.belongsTo(db.brugere);



// mange til mange dreng
db.brugere.belongsToMany(db.produkter, {through: 'brugere2produkter'})
db.produkter.belongsToMany(db.brugere, {through: 'brugere2produkter'})
module.exports = db;



