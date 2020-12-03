INSERT INTO users (name, email, password, user_image, user_bio, is_admin)
VALUES ('Marcel Mueller', 'mail.marcelm@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', './img/profile/marcel.jpg', 'I love coding and selling things', FALSE),
('Cameron Brown', 'example@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', './img/profile/cam.jpg', 'My name is Cam and I love perfect CSS alignment', FALSE),
('Michael Krishna', 'test@test.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', './img/profile/michael.jpg', 'My name is Michael and I am the route master', FALSE),
('Admin USer', 'admin@admin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', './img/test.png', 'My name is Michael and I am the route master', TRUE);

INSERT INTO listings(user_id, title, price, description, picture_url, category, posted_date)
VALUES (1, 'Mountain Bike', 600, 'Rocky Mountain bike, lightly used', './img/listings/mountainbike.jpg', 'bikes', '2020-11-27 17:35:23 +0000'),
 (3, 'Comfy Couch', 450, 'You will not regret sitting on this couch', './img/listings/couch.jpg', 'furniture', '2020-11-26 17:35:23 +0000'),
 (2, 'Macbook Pro', 700, 'Macbook Pro 2015, Core i5/16gb ram', './img/listings/macbook.jpg', 'computers', '2020-11-25 17:35:23 +0000'),
 (1, 'Playstation 5 console', 1500, 'High price due to being a dirty scalper', './img/listings/ps5.jpg', 'games', '2020-11-24 17:35:23 +0000'),
 (2, 'Crappy Bike', 600, 'Rusty bike, no returns', './img/listings/crappy.jpg', 'bikes', '2020-11-23 17:35:23 +0000'),
(2, 'BMX Bike', 400, 'Awesome for tricks', './img/listings/bmx.jpg', 'bikes', '2020-11-22 17:35:23 +0000'),
 (2, 'Downhill Bike', 4000, 'Rocky Mountain bike, lightly used', './img/listings/downhill.jpg', 'bikes', '2020-11-21 17:35:23 +0000'),
 (2, 'Road Bike', 1500, 'Amazing road bike', './img/listings/roadbike.jpg', 'bikes', '2020-11-20 17:35:23 +0000'),
 (2, 'Single Speed Bike', 600, 'Rocky Mountain bike, lightly used', './img/listings/singlespeed.jpg', 'bikes', '2020-11-19 17:35:23 +0000'),
  ( 1, 'Xbox Series X', 1500, 'High price due to being a dirty scalper', './img/listings/xbox.jpg', 'games', '2020-11-18 17:35:23 +0000'),
 (2, 'Xbox Series S', 1000, 'High price due to being a dirty scalper', './img/listings/seriess.jpg', 'games', '2020-11-17 17:35:23 +0000'),
 (1, 'Nintendo 64', 200, 'N64 with all the good games', './img/listings/n64.jpg', 'games', '2020-11-16 17:35:23 +0000'),
 (2, 'Thinkpad x1 Carbon', 900, 'Thinkpad gen 8 laptop in great shape, Core i5 8gb ram', './img/listings/thinkpadx1.jpg', 'computers', '2020-11-30 17:35:23 +0000'),
 (1, 'Surface Laptop 3', 1000, 'Surface ultrabook in great shape. Core i7 8gb ram', './img/listings/surface.jpg', 'computers', '2020-12-01 17:35:23 +0000'),
 (3, 'Gaming Rig', 1500, 'Ryzen 3700x with RTX 3080, email for full parts list', './img/listings/gamingrig.jpg', 'computers', '2020-12-03 17:35:23 +0000'),
 (2, 'Macbook Air 2020', 1000, 'Almost new Macbook Air with quad core i5, 8gb ram', './img/listings/macbookair.jpg', 'computers', '2020-12-01 17:36:23 +0000'),
 (2, 'Commodore 64', 300, 'Classic computer system, comes with accessories and floppy disks', './img/listings/c64.jpg', 'computers', '2020-12-01 17:32:23 +0000');


-- INSERT INTO messages (listing_id, receiver_id, sender_id, message)
-- VALUES (3, 2, 1, 'Hello!'),
-- (3, 2, 3, 'Hi, is this still for sale?'),
-- (4, 3, 1, 'Hello!'),
-- (2, 3, 2, 'Hello!');


INSERT INTO favorite_items (user_id, item_id)
VALUES (1, 2),
 (1, 3),
(1, 5),
(1, 1),
 (1, 4),
(1, 6),
(2, 1),
(2, 2),
(2, 4),
(2, 3),
(2, 5),
(2, 6),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6);



