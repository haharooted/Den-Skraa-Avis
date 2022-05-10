module.exports = {
    HOST: "varmserver.database.windows.net",
    USER: "sebastian",
    PASSWORD: "IFeelLikeRobertHansenIn2007", //indtast kode her
    DB: "varmdatabase",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  