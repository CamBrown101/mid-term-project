const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Return all listings for a given query
  //Maybe could add in more options
  router.get("/", (req, res) => {
    let queryText = `SELECT * FROM listings
                    WHERE 1 = 1
    `;
    const queryParams = [];
    if (req.query.text) {
      const search = "%" + req.query.text + "%";
      queryParams.push(search);
      queryText += `AND (LOWER(title) LIKE LOWER($${queryParams.length}) OR LOWER(description) LIKE LOWER($${queryParams.length}) OR LOWER(category) LIKE LOWER($${queryParams.length}))`;
    }

    if (req.query.category) {
      if (req.query.category === 'newest') {
        queryText += `ORDER BY posted_date`
      } else {
        queryText += `AND category = ${req.query.category}`;
      }
    }

    queryText += `;`;
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
  //currently only returns favourites for user 1
  router.get("/favourites", (req, res) => {
    const userID = 1;
    db.query(
      `
              SELECT * FROM listings
              JOIN favorite_items ON listings.id = item_id
              WHERE favorite_items.user_id = $1;`,
      [userID]
    )
      .then((data) => {
        const listings = data.rows;
        res.send(listings);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //individual listing
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
    db.query(
      `SELECT * FROM listings
              WHERE id = $1;`,
      [req.params.id]
    )
      .then((data) => {
        const listing = data.rows[0];
        res.send(listing);
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

  router.get("/categories", (req, res) => {
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
