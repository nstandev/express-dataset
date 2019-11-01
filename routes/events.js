var express = require("express");
var router = express.Router();
var Event = require("../models/Event");
var Actor = require("../models/Actor");
var Repo = require("../models/Repo");

// Routes related to event
router.get("/", (req, res) => {
  Event.Event.findAll({
    attributes: ["id", "type", "created_at"],
    include: [
      { model: Actor, attributes: ["id", "login", "avatar_url"] },
      { model: Repo, attributes: ["id", "name", "url"] }
    ],
    order: [["id"]]
  }).then(result => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  //   let new_event = Event.Event.create(req_event, {
  //     include: [Event.eventActor, Event.eventRepo]
  //   });
  //   console.log(new_event);
  //   res.sendStatus(200);

  let req_repo = req.body.repo;
  let req_actor = req.body.actor;
  let req_event = req.body;

  //find or create actor
  Actor.findOrCreate({
    where: { id: req_actor.id },
    defaults: { ...req_actor }
  })
    .spread((actor, created) => {
      //find or create repo if actor returns
      Repo.findOrCreate({
        where: { id: req_repo.id },
        defaults: { ...req_repo }
      })
        .spread((repo, created) => {
          //find or create event if repo returns
          Event.Event.findOrCreate({
            where: { id: req_event.id },
            defaults: {
              ...req_event,
              repoId: req_repo.id,
              actorId: req_actor.id
            }
          })
            .spread((event, created) => {
              if (created) res.sendStatus(201);
              else res.sendStatus(400);
            })
            .catch(err => {
              //   res.sendStatus(400);
              console.log("ERROR: " + err);
            });
        })
        .catch(err => {
          res.sendStatus(400);
        });
    })
    .catch(err => {
      res.sendStatus(400);
    });

  //   //find or create repo
  //   let feedRepo = Repo.findOrCreate({
  //     where: { id: req_repo.id },
  //     defaults: { ...req_repo }
  //   })
  //     .spread((repo, created) => {
  //       return repo;
  //     })
  //     .catch(err => {
  //       res.sendStatus(400);
  //     });

  //   console.log(feedActor, feedRepo);
});

router.get("/actors/:uuid", (req, res) => {
  Actor.findOne({
    where: { id: req.params.uuid }
  })
    .then(actor => {
      if (actor) {
        Event.Event.findAll({
          where: { actor_id: req.params.uuid },
          attributes: ["id", "type", "created_at"],
          include: [
            { model: Actor, attributes: ["id", "login", "avatar_url"] },
            { model: Repo, attributes: ["id", "name", "url"] }
          ],
          order: [["id"]]
        })
          .then(result => {
            res.json(result);
          })
          .catch(err => {
            console.log("ERROR: ", err);
            res.sendStatus(404);
          });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
