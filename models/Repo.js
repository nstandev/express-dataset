const db = require("../config/database");
const Sequelize = require("sequelize");

const ex = {
  repo: {
    id: 352806,
    name: "johnbolton/exercitationem",
    url: "https://github.com/johnbolton/exercitationem"
  }
};

module.exports = db.define("repos", {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUIDV4
  },
  name: Sequelize.STRING,
  url: Sequelize.STRING
});
