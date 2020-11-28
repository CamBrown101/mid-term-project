INSERT INTO users (id, name, email, password) 
VALUES (1, 'Marcel Mueller', 'mail.marcelm@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Cameron Brown', 'example@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Micheal Krishna', 'example@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO listings(id, user_id, title, price, , description, picture_url, category, posted_date)
VALUES (1, 1, 'Mountain Bike', 600, 'Rocky Mountain bike, lightly used', 'img/test.png', 'Bikes', current_timestamp),
VALUES (2, 3, 'Comfy Couch', 450, 'You will not regret sitting on this couch', 'img/test.png', 'Furniture', current_timestamp),
VALUES (3, 2, 'Macbook Pro', 700, 'Macbook Pro 2015, Core i5/16gb ram', 'img/test.png', 'Computers', current_timestamp),
VALUES (4, 1, 'Playstation 5 console', 1500, 'High price due to being a dirty scalper', 'img/test.png', 'Games', current_timestamp),
VALUES (5, 2, 'Mountain Bike', 600, 'Rocky Mountain bike, lightly used', 'img/test.png', 'Bikes', current_timestamp);

INSERT INTO messages (id, listing_id, sender_id) 
VALUES (1, 3, 2),
(2, 3, 2),
(3, 5, 3),
(4, 1, 1),
(4, 2, 3);


INSERT INTO favorite_items (id, user_id, item_id)
VALUES (1, 1, 2),
VALUES (2, 1, 3),
VALUES (3, 1, 5),
VALUES (4, 2, 1),
VALUES (5, 2, 2),
VALUES (6, 2, 4),
VALUES (7, 3, 5),
VALUES (7, 3, 2),
VALUES (7, 3, 1);



