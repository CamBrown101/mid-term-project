const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //Count all the unread messages for a user
  router.get("/unread/", (req, res) => {
    const userID = req.session.user_id;
    db.query(
      `SELECT count(messages.id)
              FROM messages
              WHERE receiver_id = $1
              AND is_read = false;`,
      [userID]
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //count unread messages for a chat
  router.get("/unread/:id", (req, res) => {
    const userID = req.session.user_id;
    const listingID = req.params.id;
    let receiverID = req.query.receiver_id;
    if (userID == receiverID) {
      receiverID = req.query.sender_id;
    }
    db.query(
      `SELECT count(messages.id)
              FROM messages
              JOIN users senders ON sender_id = senders.id
              JOIN users receivers ON receiver_id = receivers.id
              JOIN listings ON listing_id = listings.id
              WHERE ((sender_id = $1
              AND receiver_id = $3)
              OR (sender_id = $3
              AND receiver_id = $1))
              AND listing_id = $2
              AND is_read = false;`,
      [userID, listingID, receiverID]
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

//TODO mark messages as seen
router.post("/unread/:id", (req, res) => {
  const userID = req.session.user_id;
  const listingID = req.params.id;
  db.query(`
  UPDATE messages
  SET is_read = TRUE
  WHERE receiver_id = $1
  AND listing_id = $2
  RETURNING *;
  `, [userID, listingID]
  )
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err.message });
    });
});

  //Get all messages for a given listing chat
  router.get("/:id", (req, res) => {
    const userID = req.session.user_id;
    const listingID = req.params.id;
    let receiverID = req.query.receiver_id;
    if (userID == receiverID) {
      receiverID = req.query.sender_id;
    }
    db.query(
      `SELECT messages.id, messages.time, listing_id, sender_id, receiver_id, listings.user_id AS owner_id, listings.title, messages.message, senders.name AS sender, receivers.name AS receiver
              FROM messages
              JOIN users senders ON sender_id = senders.id
              JOIN users receivers ON receiver_id = receivers.id
              JOIN listings ON listing_id = listings.id
              WHERE ((sender_id = $1
              AND receiver_id = $3)
              OR (sender_id = $3
              AND receiver_id = $1))
              AND listing_id = $2
              ORDER BY messages.time;`,
      [userID, listingID, receiverID]
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
      `SELECT DISTINCT ON((listing_id, LEAST(messages.sender_id, messages.receiver_id), GREATEST(messages.sender_id, messages.receiver_id))) listing_id, owners.id as owners_id, listings.title, owners.name AS owner, messages.sender_id, messages.receiver_id, senders.name AS sender, receivers.name AS receiver
      FROM messages
      JOIN listings ON listing_id = listings.id
      JOIN users owners ON listings.user_id = owners.id
      JOIN users senders ON senders.id = messages.sender_id
      JOIN users receivers ON messages.receiver_id = receivers.id
      WHERE sender_id = $1
      OR receiver_id = $1
      OR owners.id = $1;`,
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

  router.post("/:id", (req, res) => {
    const userId = req.session.user_id;
    const listingId = req.params.id;
    const message = req.body.message;
    const receiver = req.body.receiver;
    db.query(
      `INSERT INTO messages (listing_id, receiver_id, sender_id, message, time)
              VALUES ($1, $2, $3, $4, clock_timestamp());`,
      [listingId, receiver, userId, message]
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
