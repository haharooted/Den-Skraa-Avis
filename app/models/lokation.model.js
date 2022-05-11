module.exports = (sequelize, Sequelize) => {
  const Lokation = sequelize.define("lokation", {
    lokation: {
			type: Sequelize.STRING,
    }
    }, {
      timestamps: false
    })
  return Lokation;
};
