DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    verified INTEGER DEFAULT 0,
    v_code INTEGER,
    first VARCHAR(64) NOT NULL,
    last VARCHAR(64) NOT NULL,
    alias VARCHAR(64) UNIQUE,
    mail VARCHAR(128) UNIQUE,
    phone VARCHAR(128),
    pw TEXT NOT NULL,
    icon_url VARCHAR(256),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (
    verified,
    first,
    last,
    alias,
    mail,
    phone,
    pw
) VALUES (
    2,
    'Noa',
    'Golan',
    'Noa',
    'theintuitivestory@gmail.com',
    '+49 176 47870823',
    '$2a$10$3K8nnAzervRzrQGZkSlohuxUSIJvdoe/qtZfJMhMETUPkxofHBi7O'
);
