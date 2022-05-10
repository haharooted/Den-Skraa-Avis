module.exports = (sequelize, Sequelize) => {

  const Bruger = sequelize.define("bruger", {
    id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.INTEGER,
      autoIncrement: true
      //defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
      /*set(value) {
        this.setDataValue('password', hash(value));
      }*/
    },
    navn: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telefon: {
      type: Sequelize.STRING,
      allowNull: false
    },
    is_Guldbruger: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }, 
    createdAt: {
      type: Sequelize.DATE,
      /*get(dato) {
        let datoToFix = this.getDataValue('createdAt')
        let formattedDato = datoToFix.getDate()+'-'+(datoToFix.getMonth()+1)+'-'+datoToFix.getFullYear();
        let tid = datoToFix.getHours() + ":" + datoToFix.getMinutes() + ":" + datoToFix.getSeconds();
        let formattedDateTime = formattedDato+' '+tid;
        return formattedDateTime;
      }*/
    },
    updatedAt: {
      type: Sequelize.DATE,
      /*get(dato) {
        let datoToFix = this.getDataValue('createdAt')
        let formattedDato = datoToFix.getFullYear()+'-'+datoToFix.getDate()+'-'+(datoToFix.getMonth()+1);
        let tid = datoToFix.getHours() + ":" + datoToFix.getMinutes() + ":" + datoToFix.getSeconds();
        let formattedDateTime = formattedDato+' '+tid;
        return formattedDateTime;
      }*/
  }},
    {
      getterMethods: {
        getOprettelsesDato() {
          //dato = this.getDataValue('createdAt')
          //return dato.toLocaleDateString();
        }
      }
    })
  return Bruger;
};
