const Sequelize = require("sequelize");
const db = require("../config/database");

const ex = {
  actor: {
    id: 2790311,
    login: "daniel33",
    avatar_url: "https://avatars.com/2790311"
  }
};

module.exports = db.define("actors", {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUIDV4
  },
  login: Sequelize.STRING,
  avatar_url: Sequelize.STRING
});
