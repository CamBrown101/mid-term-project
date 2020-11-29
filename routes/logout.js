const express = require("express");
const router = express.Router();

//Get a single user
module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("Deleting cookie, logging out...");
    req.session = null;
    res.redirect("/");
  });


  return router;
};
