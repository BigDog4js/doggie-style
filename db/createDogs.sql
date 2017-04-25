CREATE TABLE dogs (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    breed TEXT,
    gender VARCHAR(2),
    state VARCHAR(2),
    description TEXT,
    image TEXT,
    posted TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)