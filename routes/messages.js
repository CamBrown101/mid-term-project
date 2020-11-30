const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get all messages for a given listing
  router.get("/:id", (req, res) => {
    const userID = req.session.user_id;
    const listingID = req.params.id;
    db.query(
      `SELECT messages.id, listing_id, sender_id, receiver_id, listings.title, messages.message, senders.name AS sender, receivers.name AS receiver
              FROM messages
              JOIN users senders ON sender_id = senders.id
              JOIN users receivers ON receiver_id = receivers.id
              JOIN listings ON listing_id = listings.id
              WHERE (sender_id = $1
              OR receiver_id = $1)
              AND listing_id = $2;`,
      [userID, listingID]
    )
      .then((data) => {
        const returnData = {
          messages: data.rows,
          user_id: req.session.user_id,
        };
        res.send(returnData);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get all messages for a user
  router.get("/", (req, res) => {
    const userID = req.session.user_id;
    db.query(
      `SELECT messages.id, listing_id, sender_id, receiver_id, listings.title, messages.message, senders.name AS sender, receivers.name AS receiver
              FROM messages
              JOIN users senders ON sender_id = senders.id
              JOIN users receivers ON receiver_id = receivers.id
              JOIN listings ON listing_id = listings.id
              WHERE sender_id = $1
              OR receiver_id = $1;`,
      [userID]
    )
      .then((data) => {
        const returnData = {
          messages: data.rows,
          user_id: req.session.user_id,
        };
        res.send(returnData);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //WIP need get reciever id
  router.post("/:id", (req, res) => {
    console.log(req.body);
    userID = req.session.user_id;
    const listingID = req.params.id;
    const message = req.body.message;
    db.query(
      `INSERT INTO messages (listing_id, receiver_id, sender_id, message)
              VALUES ($1, 2, $2, $3);`,
      [userID, listingID, message]
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
