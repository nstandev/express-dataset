var express = require("express");
var router = express.Router();
const Actor = require("../models/Actor");
const sequelize = require("sequelize");

// Routes related to actor.
router.get("/", (req, res) => {
  Actor.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    order: [
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM events WHERE events.actor_id = actors.id)"
        ),
        "DESC"
      ],
      [
        sequelize.literal(
          "(SELECT created_at FROM events WHERE events.actor_id = actors.id)"
        ),
        "DESC"
      ],
      ["login", "ASC"]
    ]
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.json(401);
    });
});

router.get("/streak", (req, res) => {
  Actor.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
      //   include: [[sequelize.literal(query), "max"]]
    },
    order: [
      [sequelize.literal(query), "DESC"],
      [
        sequelize.literal(
          "(SELECT created_at FROM events WHERE events.actor_id = actors.id)"
        ),
        "DESC"
      ],
      ["login", "ASC"]
    ]
  }).then(result => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  Actor.create(req.body).then(result => {
    console.log(result);
  });
});

router.put("/", (req, res) => {
  console.log(req.body);
  Actor.findOne({ where: { id: req.body.id } }).then(actor => {
    console.log(actor);
    if (actor)
      actor.update({ avatar_url: req.body.avatar_url }).then(data => {
        console.log("done");
        res.sendStatus(200);
      });
    else res.sendStatus(404);
  });
});

let query = `
(SELECT MAX(consecutiveDates) AS max
FROM
(SELECT 
  COUNT(*) AS consecutiveDates
FROM 
(SELECT
      ROW_NUMBER() OVER (ORDER BY created_at) AS rn,
      date(created_at, -ROW_NUMBER() OVER (ORDER BY created_at) || " day") AS grp,
      created_at
FROM
(SELECT
  ROW_NUMBER() OVER (ORDER BY created_at) AS [row number],
  created_at
FROM (SELECT DISTINCT DATE(created_at) AS created_at FROM events WHERE events.actor_id = actors.id)))
GROUP BY grp))`;

module.exports = router;
