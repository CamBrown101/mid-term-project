const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get all messages for a given user
  router.get("/", (req, res) => {
    console.log("Deleting cookie, logging out...");
    req.session = null;
    res.render("/");
  });

  return router;
};
