const express = require("express");
const router = express.Router();

//Get a single user
module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("Deleting cookie, logging out...");
    req.session = null;
<<<<<<< HEAD
=======
    res.clearCookie("user_id");

>>>>>>> 1ed0caacdcb40a3343bc705f140800beb6b33c1d
    res.redirect("/");
  });


  return router;
};
