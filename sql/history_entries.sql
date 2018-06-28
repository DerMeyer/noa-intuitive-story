DROP TABLE IF EXISTS history_entries;

CREATE TABLE history_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(64) NOT NULL,
    time_period INTEGER NOT NULL,
    place VARCHAR(64) NOT NULL,
    wiki_link TEXT NOT NULL
);
