const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Home page listings
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM listings;`)
      .then(data => {
        const listings = data.rows;
        const templateVars = { listings };
        res.render("listings", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //individual listing
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM listings
              WHERE id = $1;`, req.params.id)
      .then(data => {
        const listing = data.rows[0];
        const templateVars = { listing };
        res.render("listings/id", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/:id", (req, res) => {
    db.query(`INSERT INTO listings ()
              VALUES ()
              RETURN *;`)
      .then(data => {
        const listing = data.rows[0];
        const templateVars = { listing };
        res.render("listings/id", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
