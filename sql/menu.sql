DROP TABLE IF EXISTS menu;

CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    menu TEXT NOT NULL
);

INSERT INTO menu (
    menu
) VALUES (
    '{
        "About": {
            "type": "menu",
            "menu": {
                "Video": {
                    "type": "page"
                },
                "How the Game works": {
                    "type": "page"
                },
                "Purpose and Vision": {
                    "type": "page"
                },
                "About me": {
                    "type": "page"
                },
                "Inspirations": {
                    "type": "page"
                },
                "Reviews": {
                    "type": "page"
                }
            }
        },
        "Join the Game": {
            "type": "menu",
            "menu": {
                "Create a Game": {
                    "type": "page"
                },
                "Join a Game": {
                    "type": "page"
                }
            }
        },
        "All Games": {
            "type": "component"
        },
        "TIS Lab": {
            "type": "page"
        },
        "Q & A": {
            "type": "page"
        }
    }'::json
);
