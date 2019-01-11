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
        "Video"
    ]'::json,
    '[
        {
            "key": "MC4wNjk0NzE0ODU4NzM2MDc0MQ==",
            "text": "",
            "html": "video",
            "className": "",
            "style": {},
            "url": "https://www.youtube.com/watch?time_continue=16&v=A3CLS6u7s1k",
            "autoplay": "true"
        }
    ]'::json
);
