const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Display all listings
  //Maybe could add in options to make this our search results page
  router.get("/", (req, res) => {
    return db
      .query(`SELECT * FROM listings;`)
      .then((data) => {
        const listings = data.rows;
        res.send(listings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //TODO using logged in user id query db for user favorites then display
  router.get("/favourites", (req, res) => {
    db.query(`SELECT * FROM listings;`)
      .then((data) => {
        const listings = data.rows;
        const templateVars = { listings };
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //individual listing
  router.get("/:id", (req, res) => {
    db.query(
      `SELECT * FROM listings
              WHERE id = $1;`,
      req.params.id
    )
      .then((data) => {
        const listing = data.rows[0];
        const templateVars = { listing };
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //create a listing
  router.post("/", (req, res) => {
    db.query(
      `INSERT INTO listings ()
              VALUES ()
              RETURN *;`
    )
      .then((data) => {
        const listing = data.rows[0];
        const templateVars = { listing };
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
