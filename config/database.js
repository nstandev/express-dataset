const Sequelize = require("sequelize");

module.exports = new Sequelize("database", "", "", {
  host: "localhost",
  dialect: "sqlite",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: "./database.sqlite"
});
