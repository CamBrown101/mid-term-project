const express = require('express');
const router  = express.Router();

//Display page of user
module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const user = data.rows[0];
        const templateVars = { user };
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
