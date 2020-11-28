INSERT INTO users (id, name, email, password) 
VALUES (1, 'Marcel Mueller', 'mail.marcelm@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Cameron Brown', 'example@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Micheal Krishna', 'example@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO listings(id, user_id, title, price, description, picture_url, category, posted_date)
VALUES (1, 1, 'Mountain Bike', 600, 'Rocky Mountain bike, lightly used', 'img/test.png', 'bikes', current_timestamp),
 (2, 3, 'Comfy Couch', 450, 'You will not regret sitting on this couch', 'img/test.png', 'furniture', current_timestamp),
 (3, 2, 'Macbook Pro', 700, 'Macbook Pro 2015, Core i5/16gb ram', 'img/test.png', 'computers', current_timestamp),
 (4, 1, 'Playstation 5 console', 1500, 'High price due to being a dirty scalper', 'img/test.png', 'games', current_timestamp),
 (5, 2, 'Mountain Bike', 600, 'Rocky Mountain bike, lightly used', 'img/test.png', 'bikes', current_timestamp),
(6, 2, 'BMX Bike', 400, 'Awesome for tricks', 'img/test.png', 'bikes', current_timestamp),
 (7, 2, 'Downhill Bike', 4000, 'Rocky Mountain bike, lightly used', 'img/test.png', 'bikes', current_timestamp),
 (8, 2, 'Road Bike', 1500, 'Amazing road bike', 'img/test.png', 'bikes', current_timestamp),
 (9, 2, 'Single Speed Bike', 600, 'Rocky Mountain bike, lightly used', 'img/test.png', 'bikes', current_timestamp),
  (10, 1, 'Xbox Series X', 1500, 'High price due to being a dirty scalper', 'img/test.png', 'games', current_timestamp),
 (11, 1, 'Xbox Series S', 1000, 'High price due to being a dirty scalper', 'img/test.png', 'games', current_timestamp),
 (12, 1, 'Nintendo 64', 200, 'N64 with all the good games', 'img/test.png', 'games', current_timestamp),
 (13, 1, 'Sega Genesis', 60, 'Sega Genesis with Sonic the Hedgehog', 'img/test.png', 'games', current_timestamp);



INSERT INTO messages (id, listing_id, sender_id, message)
VALUES (1, 3, 2, 'Hello!'),
(2, 3, 2, 'Hi, is this still for sale?'),
(3, 4, 3, 'Hello!'),
(4, 1, 1, 'Hello!'),
(5, 2, 3, 'Hello!');


INSERT INTO favorite_items (id, user_id, item_id)
VALUES (1, 1, 2),
 (2, 1, 3),
(3, 1, 5),
(4, 2, 1),
(5, 2, 2),
(6, 2, 4),
(7, 3, 5),
(8, 3, 2),
(9, 3, 1);



