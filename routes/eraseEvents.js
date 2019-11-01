var express = require("express");
var router = express.Router();
var Event = require("../models/Event");

// Route related to delete events
router.delete("/", (req, res) => {
  Event.Event.destroy({
    where: {},
    truncate: true
  }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
