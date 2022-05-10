module.exports = (sequelize, Sequelize) => {
  const Produkt = sequelize.define("produkt", {
    id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
    },
    titel: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pris: {
      type: Sequelize.STRING,
      allowNull: false
    },
    beskrivelse: {
      type: Sequelize.STRING,
      allowNull: false
    },
    billedeUrl: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Produkt;
};
