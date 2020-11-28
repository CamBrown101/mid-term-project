const express = require('express');
const router  = express.Router();

//Get a single user
module.exports = (db) => {
  router.get("/", (req, res) => {
    const email = req.query.email;
    db.query(`SELECT * FROM users
              WHERE email = $1;`, [email])
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
