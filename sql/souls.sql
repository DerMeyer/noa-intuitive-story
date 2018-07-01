DROP TABLE IF EXISTS souls;

CREATE TABLE souls (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    soul VARCHAR(32) NOT NULL,
    story text
);

INSERT INTO souls (user_id, group_id, soul, story) VALUES (2, 1, 'bezrechu', 'User story one.');
INSERT INTO souls (user_id, group_id, soul, story) VALUES (3, 1, 'vermel', 'User story two.');
INSERT INTO souls (user_id, group_id, soul, story) VALUES (4, 1, 'grun', 'User story three.');
INSERT INTO souls (user_id, group_id, soul, story) VALUES (5, 1, 'sagol', 'User story four.');
INSERT INTO souls (user_id, group_id, soul, story) VALUES (6, 1, 'gul', 'User story five.');

INSERT INTO souls (user_id, group_id, soul, story) VALUES (2, 2, 'bezrechu', 'User story one.');
INSERT INTO souls (user_id, group_id, soul, story) VALUES (3, 2, 'vermel', 'User story two.');
INSERT INTO souls (user_id, group_id, soul, story) VALUES (6, 2, 'gul', 'User story five.');
