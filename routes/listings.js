const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Display all listings or display search results if given query
  //Maybe could add in more options
  router.get("/", (req, res) => {
    let queryText = `SELECT * FROM listings
    `
    const queryParams = [];
    if (req.query.text) {
      const search = '%' + req.query.text + '%';
      queryParams.push(search);
      queryText += `WHERE title LIKE $${queryParams.length}`;

    }
    queryText += `;`;
    console.log(queryText, queryParams);
    db.query(queryText, queryParams)
      .then(data => {
        const listings = data.rows;
        const templateVars = { listings };
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //TODO using logged in user id query db for user favorites then display
  router.get("/favourites", (req, res) => {
    db.query(`SELECT * FROM listings;`)
      .then(data => {
        const listings = data.rows;
        const templateVars = { listings };
        res.render("index", templateVars);
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
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //create a listing
  router.post("/", (req, res) => {
    db.query(`INSERT INTO listings ()
              VALUES ()
              RETURN *;`)
      .then(data => {
        const listing = data.rows[0];
        const templateVars = { listing };
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
