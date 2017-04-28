INSERT INTO users (facebook_id, name)
VALUES ($1, $2)
ON CONFLICT (facebook_id) 
DO UPDATE
SET last_logged_in = now()
returning *;