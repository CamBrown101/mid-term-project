const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Single page messages app using ajax?
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM messages;`)
      .then(data => {
        const messages = data.rows;
        const templateVars = { messages };
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
