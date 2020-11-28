const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Display all listings or display search results if given query
  //Maybe could add in more options
  router.get("/", (req, res) => {
    let queryText = `SELECT * FROM listings
    `;
    const queryParams = [];
    if (req.query.text) {
      const search = "%" + req.query.text + "%";
      queryParams.push(search);
      queryText += `WHERE title LIKE $${queryParams.length}`;
    }
    queryText += `;`;
    console.log(queryText, queryParams);
    db.query(queryText, queryParams)
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
    const userID = 1;
    db.query(
      `SELECT * FROM listings
              WHERE user_id = 1;`
    )
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
    const listing = req.query;
    const queryParams = [
      listing.user_id,
      listing.title,
      listing.price,
      listing.description,
      listing.picture_url,
      listing.category,
    ];
    db.query(
      `INSERT INTO listings (user_id, title, price, description, picture_url, category, posted_date)
              VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
              RETURNING *;`,
      queryParams
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

  router.post("/categories", (req, res) => {
    const listing = req.query;
    console.log(req);
    console.log(res);

    const queryStrings = [
      `SELECT * FROM listings ORDER BY posted_date LIMIT 10`,
      `SELECT * FROM listings WHERE category = 'Games' ORDER BY posted_date LIMIT 10`,
      `SELECT * FROM listings WHERE category = 'Bikes' ORDER BY posted_date LIMIT 10`,
    ];

    db.query(queryStrings[0], [])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
