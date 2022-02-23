-- \c cta_dev;

INSERT INTO 
    storeapp
        (name, developer, image, price, description, category, age, featured) 
VALUES
    ('Angry Birdz Reloaded', 'Rovio', 'https://cdn.pixabay.com/photo/2020/05/16/00/25/wallpapers-5175518_1280.png', 5, 'The world''s most famous flock has returned in a new version of the mobile game that took the world by storm', 'Games', '3+', false),
    ('Zoombinis', 'Encore', 'https://cdn.pixabay.com/photo/2012/04/11/17/31/vegetables-29063_1280.png', 10, 'Zoombinis is a re-creation of the classic, award-winning 1990''s puzzle game Logical Journey of the Zoombinis', 'Education', '9+', true),
    ('Music World Karaoke', 'Foriero', 'https://cdn.pixabay.com/photo/2016/06/16/08/42/monster-1460885_1280.png', 4, 'Beautifully rendered the most popular children songs with lyrics text and jumping star', 'Music', '3+', true),
    ('Typing Fingers LT', 'Foriero', 'https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png', 2, 'Typing Fingers uses a completely new approach to teach the efficient touch-typing (ten-fingers) system', 'Education', '3+', true),
    ('Amazon Prime Video', 'AMZN Mobile', 'https://cdn.pixabay.com/photo/2015/12/03/01/27/play-1073616_1280.png', 0, 'The world''s most famoous flock has returned in a new version of the mobile game that took the world by storm', 'Entertainment', '12+', false);

INSERT INTO 
    reviews (storeapp_id, reviewer, title, content, rating)
VALUES 
    ('1', 'Charlie', 'Action-Packed!', 'This is probably the best game series ever created', 4),
    ('3', 'Carly', 'Classic', 'I''m really happy with many of the classic songs', 3),
    ('2', 'Colin', 'Biggest Fan', 'This was a favorite game of mine throughout my childhood', 5),
    ('5', 'Carlos', 'Needs Work', 'Shows my mac can''t play any video on external monitors due to content protection standards', 2),
    ('4', 'Cindy', 'Great Way to Learn, but...', 'The lite version only covers a few letters, then you have to pay', 4);