USE myflix;

-- Reset data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE reviews;
TRUNCATE TABLE movies;
TRUNCATE TABLE genres;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (name, email, password_hash, role) VALUES
('Admin', 'admin@example.com', '$2b$10$l4y74/dpjTKOp7dBzcnG3eAzVO8x9YwI3rfPqpb8POCwejKo0l4QK', 'admin'),
('Jane User', 'jane@example.com', '$2b$10$l4y74/dpjTKOp7dBzcnG3eAzVO8x9YwI3rfPqpb8POCwejKo0l4QK', 'user');

INSERT INTO genres (name, description, popularity_score, is_active) VALUES
('Action', 'High octane action films', 85, 1),
('Drama', 'Emotional storytelling', 70, 1),
('Comedy', 'Laugh-out-loud movies', 65, 1),
('Sci-Fi', 'Futuristic and science fiction', 90, 1),
('Horror', 'Scary and thrilling', 55, 1),
('Documentary', 'Informative real stories', 40, 1);

INSERT INTO movies (genre_id, title, synopsis, release_date, duration_minutes, poster_url) VALUES
(1, 'Edge of Tomorrow', 'A soldier relives the same day fighting aliens.', '2014-06-06', 113, 'https://via.placeholder.com/150'),
(4, 'Interstellar', 'Explorers travel through a wormhole in space.', '2014-11-07', 169, 'https://via.placeholder.com/150'),
(2, 'The Pursuit of Happyness', 'True story of perseverance.', '2006-12-15', 117, 'https://via.placeholder.com/150'),
(3, 'The Mask', 'A man finds a magical mask.', '1994-07-29', 101, 'https://via.placeholder.com/150');

INSERT INTO reviews (movie_id, user_id, score, comment, is_spoiler, review_date) VALUES
(1, 2, 9, 'Great action and time loop story', 0, NOW()),
(2, 2, 10, 'Mind-blowing visuals and story', 0, NOW()),
(3, 2, 8, 'Inspirational drama', 0, NOW());
