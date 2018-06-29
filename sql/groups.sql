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

INSERT INTO groups (
    name,
    time_period,
    story,
    gul_user_id,
    grun_user_id,
    vermel_user_id,
    bezrechu_user_id,
    sagol_user_id
) VALUES (
    'Florence',
    1592,
    'This is the first group story to come out of Noas database.',
    2,
    3,
    4,
    5,
    6
);

INSERT INTO groups (
    name,
    time_period,
    story,
    gul_user_id,
    grun_user_id,
    vermel_user_id,
    bezrechu_user_id,
    sagol_user_id
) VALUES (
    'Florence',
    1592,
    'This is the first group story to come out of Noas database.',
    2,
    3,
    4,
    5,
    6
);
