DROP TABLE IF EXISTS souls;

CREATE TABLE souls (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    soul VARCHAR(32) NOT NULL,
    figur VARCHAR(32),
    story text
);
