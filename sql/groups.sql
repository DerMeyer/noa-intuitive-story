DROP TABLE IF EXISTS groups;

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    time_period INTEGER NOT NULL,
    story TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gul_user_id INTEGER,
    grun_user_id INTEGER,
    vermel_user_id INTEGER,
    bezrechu_user_id INTEGER,
    sagol_user_id INTEGER
);
