const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get all messages for a given user
  router.get("/:id", (req, res) => {
    const userID = req.session.user_id;
    const listingID = req.params.id;
    console.log(req.session.id);
    db.query(`SELECT messages.id, listing_id, sender_id, receiver_id, listings.title, messages.message
              FROM messages
              JOIN users ON sender_id = users.id
              JOIN listings ON listing_id = listings.id
              WHERE sender_id = $1
              OR reciever_id = $1
              AND listing_id = $2;`,
      [userID, listingID]
    )
      .then((data) => {
        const messages = data.rows;
        res.send(messages);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  //WIP
  router.post("/:id", (req, res) => {
    userID = req.session.user_id;
    const listingID = req.params.id;
    db.query(`INSERT INTO messages (listing_id, receiver_id, sender_id, message)
              VALUES ($1, 2, $3, 'TEST');`,
      [userID, listingID]
    )
      .then((data) => {
        const messages = data.rows;
        res.send(messages);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
