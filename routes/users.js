const express = require('express');
const router  = express.Router();

//Get a single user
module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const user = req.params.id;
    db.query(`SELECT * FROM users
              WHERE id = $1;`, [user])
      .then(data => {
        const user = data.rows[0];
        res.send(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
