const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Return all listings for a given query
  //Maybe could add in more options
  router.get("/", (req, res) => {
    let queryText = `SELECT * FROM listings
                    WHERE is_sold = FALSE
    `;
    const queryParams = [];
    if (req.query.text) {
      const search = "%" + req.query.text + "%";
      queryParams.push(search);
      queryText += `AND (LOWER(title) LIKE LOWER($${queryParams.length}) OR LOWER(description) LIKE LOWER($${queryParams.length}) OR LOWER(category) LIKE LOWER($${queryParams.length}))`;
    }

    if (req.query.category) {
      if (req.query.category === "newest") {
        queryText += `ORDER BY posted_date DESC
        LIMIT 4`;
      } else {
        queryText += `
        AND category = '${req.query.category}' LIMIT 4`;
      }
    }

    queryText += `;`;
    db.query(queryText, queryParams)
      .then((data) => {
        const listings = data.rows;
        res.send(listings);
      })
      .then(() => {
        res.redirect("");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Sends favourites for logged in user
  router.get("/favourites", (req, res) => {
    const userID = req.session.user_id;
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

  //Sends single favourite for logged in user
  router.get("/favourites/:id", (req, res) => {
    const userID = req.session.user_id;
    const listingID = req.params.id;
    db.query(
      `
              SELECT * FROM favorite_items
              WHERE user_id = $1
              AND item_id = $2;`,
      [userID, listingID]
    )
      .then((data) => {
        const listings = data.rows[0];
        res.send(listings);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/favourites/:id/delete", (req, res) => {
    const userID = req.session.user_id;
    const listingID = req.params.id;
    db.query(
      `DELETE FROM favorite_items
              WHERE user_id = $1
              AND item_id = $2;`,
      [userID, req.body.listing]
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Post new favourite for user
  router.post("/favourites", (req, res) => {
    const userID = req.session.user_id;
    db.query(
      `
              INSERT INTO favorite_items (user_id, item_id)
              VALUES ($1, $2);`,
      [userID, req.body.listing]
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //individual listing
  router.get("/:id", (req, res) => {
    db.query(
      `SELECT listings.id, listings.user_id, listings.title, listings.price, listings.description, listings.picture_url, listings.category, listings.posted_date, users.name
              FROM listings
              JOIN users ON user_id = users.id
              WHERE listings.id = $1;`,
      [req.params.id]
    )
      .then((data) => {
        const returnData = {
          listing: data.rows[0],
          user_id: req.session.user_id,
        };
        res.send(returnData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  //Sends the user id of the owner of the listing
  router.get("/owner/:id", (req, res) => {
    const userID = req.session.user_id;
    db.query(
      `SELECT user_id FROM listings
              WHERE id = $1;`,
      [req.params.id]
    )
      .then((data) => {
        const returnData = {
          owner: data.rows[0].user_id,
          user_id: userID,
        };
        res.send(returnData);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //create a listing
  router.post("/", (req, res) => {
    const listing = req.body;
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
              VALUES ($1, $2, $3, $4, $5, $6, clock_timestamp())
              RETURNING *;`,
      queryParams
    )
      .then((data) => {
        const listing = data.rows[0];
        res.send(listing);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Delete a listing
  router.post("/delete", (req, res) => {
    const listingId = req.body.listingid;
    const loggedInId = req.session.user_id;
    const queryParams = [listingId, loggedInId];

    const queryString = `
    DELETE FROM listings
    WHERE listings.id = $1
    AND listings.user_id = $2;`;

    db.query(queryString, queryParams)
      .then(() => {
        res.send("Deleted");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Mark a listing as sold
  router.post("/sold", (req, res) => {
    const listingId = req.body.listingid;
    const loggedInId = req.session.user_id;
    const queryParams = [listingId, loggedInId];

    const queryString = `
    UPDATE listings
    SET is_sold = true,
    sold_date = clock_timestamp()
    WHERE listings.id = $1
    AND listings.user_id = $2
    RETURNING *;
`;
    db.query(queryString, queryParams)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
