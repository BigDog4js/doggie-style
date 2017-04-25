CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    facebook_id VARCHAR(100),
    name VARCHAR(255),
    state VARCHAR(2)
)