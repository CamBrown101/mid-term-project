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
        const user = data.rows[0];
        res.redirect("/");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
