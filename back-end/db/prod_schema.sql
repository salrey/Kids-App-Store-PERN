DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS storeapp;

CREATE TABLE storeapp (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    developer TEXT NOT NULL,
    image TEXT,
    price INT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    age TEXT NOT NULL,
    featured BOOLEAN
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer TEXT NOT NULL,
    title TEXT,
    content TEXT NOT NULL,    
    rating INT,
    CHECK (rating >= 0 AND rating <= 5),
    storeapp_id INTEGER REFERENCES storeapp (id)
        ON DELETE CASCADE
);