const Sequelize = require("sequelize");
const db = require("../config/database");
const Repo = require("./Repo");
const Actor = require("./Actor");

const ex = {
  id: 4055191679,
  type: "PushEvent",
  actor: {
    id: 2790311,
    login: "daniel33",
    avatar_url: "https://avatars.com/2790311"
  },
  repo: {
    id: 352806,
    name: "johnbolton/exercitationem",
    url: "https://github.com/johnbolton/exercitationem"
  },
  created_at: "2015-10-03 06:13:31"
};

const Event = db.define(
  "events",
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUIDV4
    },
    type: Sequelize.STRING,
    created_at: Sequelize.DataTypes.DATE
  },
  { underscored: true }
);

const eventRepo = Event.belongsTo(Repo);
const eventActor = Event.belongsTo(Actor);

module.exports = {
  Event,
  eventRepo,
  eventActor
};
