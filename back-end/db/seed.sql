-- \c cta_dev;

INSERT INTO 
    storeapp
        (name, developer, image, price, description, category, age, featured) 
VALUES
    ('Angry Birdz Reloaded', 'Rovio', 'https://placeit.net/b3bcfacf54fb32', 5, 'The world''s most famous flock has returned in a new version of the mobile game that took the world by storm', 'Games', '3+', false),
    ('Zoombinis', 'Encore', 'https://placeit.net/cc91d903e4f66f', 10, 'Zoombinis is a re-creation of the classic, award-winning 1990''s puzzle game Logical Journey of the Zoombinis', 'Education', '9+', true),
    ('Music World Karaoke', 'Foriero', 'https://placeit.net/1d2dbb6108c114', 4, 'Beautifully rendered the most popular children songs with lyrics text and jumping star', 'Music', '3+', true),
    ('Typing Fingers LT', 'Foriero', 'https://placeit.net/85462ee7d1535f', 2, 'Typing Fingers uses a completely new approach to teach the efficient touch-typing (ten-fingers) system', 'Education', '3+', true),
    ('Amazon Prime Video', 'AMZN Mobile', 'https://placeit.net/723023c545163a', 0, 'The world''s most famoous flock has returned in a new version of the mobile game that took the world by storm', 'Entertainment', '12+', false);

INSERT INTO 
    reviews (storeapp_id, reviewer, title, content, rating)
VALUES 
    ('1', 'Charlie', 'Action-Packed!', 'This is probably the best game series ever created', 4),
    ('3', 'Carly', 'Classic', 'I''m really happy with many of the classic songs', 3),
    ('2', 'Colin', 'Biggest Fan', 'This was a favorite game of mine throughout my childhood', 5),
    ('5', 'Carlos', 'Needs Work', 'Shows my mac can''t play any video on external monitors due to content protection standards', 2),
    ('4', 'Cindy', 'Great Way to Learn, but...', 'The lite version only covers a few letters, then you have to pay', 4);