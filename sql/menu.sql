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
            "subMenu": {
                "Video": {
                    "page": true
                },
                "How the Game works": {
                    "page": true
                },
                "Purpose and Vision": {
                    "page": true
                },
                "The five Souls": {
                    "page": true
                },
                "About me": {
                    "page": true
                },
                "Inspirations": {
                    "page": true
                }
            }
        },
        "Join the Game": {
            "subMenu": {
                "Create a Game": {
                    "page": true
                },
                "Join a Game": {
                    "page": true
                }
            }
        },
        "All Games": {
            "component": true
        },
        "All Characters": {
            "subMenu": {
                "Rebel": {
                    "page": true
                },
                "Leader": {
                    "page": true
                },
                "Romantic": {
                    "page": true
                },
                "Realist": {
                    "page": true
                },
                "Messiah": {
                    "page": true
                }
            }
        },
        "Q & A": {
            "page": true
        }
    }'::json
);
