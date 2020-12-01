const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //Post new favourite for user
  router.post("/", (req, res) => {
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

  //Sends favourites for logged in user
  router.get("/", (req, res) => {
    const userID = req.session.user_id;
    db.query(
      `
              SELECT listings.*,
              favorite_items.item_id AS fave_item_ID,
              favorite_items.user_id AS fave_user_ID,
              favorite_items.id AS fave_id
              FROM listings
              JOIN favorite_items ON item_id = listings.id
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

  router.post("/:id/delete", (req, res) => {
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

  //Sends single favourite for logged in user
  router.get("/:id", (req, res) => {
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
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
