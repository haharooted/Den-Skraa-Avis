// Kategori model
module.exports = (sequelize, Sequelize) => {
  const Kategori = sequelize.define("kategori", {
    kategori: {
			type: Sequelize.STRING,
    }
    }, {
      timestamps: false
    })
  return Kategori;
};
