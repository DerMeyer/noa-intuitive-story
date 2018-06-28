DROP TABLE IF EXISTS intuitive_notes;

CREATE TABLE intuitive_notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    img_url VARCHAR(128),
    headline TEXT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
