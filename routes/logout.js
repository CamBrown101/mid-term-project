const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("Deleting cookie, logging out...");
    req.session = null;
    res.clearCookie("user_id");

    res.redirect("/");
  });

  return router;
};
