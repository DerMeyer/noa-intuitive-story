DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    verified INTEGER,
    first VARCHAR(64) NOT NULL,
    last VARCHAR(64) NOT NULL,
    alias VARCHAR(64) NOT NULL,
    mail VARCHAR(128) UNIQUE,
    phone VARCHAR(128) UNIQUE,
    pw TEXT NOT NULL,
    icon_url VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);