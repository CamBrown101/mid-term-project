INSERT INTO users (name, email, password)
VALUES ('Marcel Mueller', 'mail.marcelm@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Cameron Brown', 'example@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Micheal Krishna', 'test@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO listings(user_id, title, price, description, picture_url, category, posted_date)
VALUES (1, 'Mountain Bike', 600, 'Rocky Mountain bike, lightly used', 'https://www.freeiconspng.com/uploads/money-flat-money-png-15.png', 'bikes', current_timestamp),
 (3, 'Comfy Couch', 450, 'You will not regret sitting on this couch', './img/test.png', 'furniture', current_timestamp),
 (2, 'Macbook Pro', 700, 'Macbook Pro 2015, Core i5/16gb ram', './img/test.png', 'computers', current_timestamp),
 (1, 'Playstation 5 console', 1500, 'High price due to being a dirty scalper', './img/test.png', 'games', current_timestamp),
 (2, 'Mountain Bike', 600, 'Rocky Mountain bike, lightly used', './img/test.png', 'bikes', current_timestamp),
(2, 'BMX Bike', 400, 'Awesome for tricks', './img/test.png', 'bikes', current_timestamp),
 (2, 'Downhill Bike', 4000, 'Rocky Mountain bike, lightly used', './img/test.png', 'bikes', current_timestamp),
 (2, 'Road Bike', 1500, 'Amazing road bike', 'img/test.png', 'bikes', current_timestamp),
 (2, 'Single Speed Bike', 600, 'Rocky Mountain bike, lightly used', './img/test.png', 'bikes', current_timestamp),
  ( 1, 'Xbox Series X', 1500, 'High price due to being a dirty scalper', './img/test.png', 'games', current_timestamp),
 (1, 'Xbox Series S', 1000, 'High price due to being a dirty scalper', './img/test.png', 'games', current_timestamp),
 (1, 'Nintendo 64', 200, 'N64 with all the good games', './img/test.png', 'games', current_timestamp),
 (1, 'Sega Genesis', 60, 'Sega Genesis with Sonic the Hedgehog', './img/test.png', 'games', current_timestamp);



INSERT INTO messages (listing_id, receiver_id, sender_id, message)
VALUES (3, 2, 1, 'Hello!'),
(3, 2, 3, 'Hi, is this still for sale?'),
(4, 3, 1, 'Hello!'),
(1, 2, 2,  'Hello!'),
(2, 3, 2, 'Hello!');


INSERT INTO favorite_items (user_id, item_id)
VALUES (1, 2),
 (1, 3),
(1, 5),
(2, 1),
(2, 2),
(2, 4),
(3, 5),
(3, 2),
(3, 1);



