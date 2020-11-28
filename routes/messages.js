const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Single page messages app using ajax?
  router.get("/:id", (req, res) => {
    userID = req.params.id;
    db.query(`SELECT * FROM messages
              WHERE sender_id = $1;`,  [userID])
      .then(data => {
        const messages = data.rows;
        res.send(messages)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
