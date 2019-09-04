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
                "The five Souls": {
                    "type": "page"
                },
                "About me": {
                    "type": "page"
                },
                "Inspirations": {
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
        "All Characters": {
            "type": "menu",
            "menu": {
                "Rebel": {
                    "type": "page"
                },
                "Leader": {
                    "type": "page"
                },
                "Romantic": {
                    "type": "page"
                },
                "Realist": {
                    "type": "page"
                },
                "Messiah": {
                    "type": "page"
                }
            }
        },
        "Q & A": {
            "type": "page"
        }
    }'::json
);

/*INSERT INTO menu (
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
);*/
