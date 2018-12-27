DROP TABLE IF EXISTS pages;

CREATE TABLE pages (
    id SERIAL PRIMARY KEY,
    page_path TEXT NOT NULL,
    page_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pages (
    page_path,
    page_content
) VALUES (
    '[
        "About",
        "Editor"
    ]'::json,
    '[
        {
            "key": "RandomkeyOne",
            "text": "Brilliant Test Page Element.",
            "html": "h3",
            "className": "",
            "style": {},
            "url": ""
        },
        {
            "key": "RandomkeyTwo",
            "text": "Little Paragraph.",
            "html": "p",
            "className": "",
            "style": {},
            "url": ""
        },
        {
            "key": "RandomkeyThree",
            "text": "And a span.",
            "html": "span",
            "className": "",
            "style": {},
            "url": ""
        }
    ]'::json
);
