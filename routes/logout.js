const express = require("express");
const router = express.Router();

//Get a single user
module.exports = (db) => {
  router.get("/", (req, res) => {
    req.session = null;
    res.clearCookie("user_id");
    res.redirect("/");
  });

  return router;
};
