const express = require("express");
const router = express.Router();

//Get a single user
module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    db.query(
      `SELECT * FROM users
              WHERE email = $1;`,
      [email]
    )
      .then((data) => {
        if (data.rows.length >= 1) {
          req.session.user_id = data.rows[0].id;
        }
        res.redirect("/");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/", (req, res) => {
    const id = req.session.user_id;
    db.query(
      `SELECT name FROM users
            WHERE id = $1;`,
      [id]
    )
      .then((data) => {
        const user = data.rows[0];
        if (user) {
          console.log(user);
          res.send(user);
        } else {
          res.send(false);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
