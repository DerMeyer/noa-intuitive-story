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

INSERT INTO pages (
    page_path,
    page_content
) VALUES (
    '[
        "About",
        "The five Souls"
    ]'::json,
    '[
        {
            "key": "MC4wNjk0NzE0ODU4NzM2MDc0MQ==",
            "text": "The Five Souls",
            "html": "headline",
            "className": "",
            "style": {},
            "url": ""
        },
        {
            "key": "MC4wMjE1MzE2MTYwNzk5MDg2MQ==",
            "text": "At this stage I don’t want to say much about the souls because it might influence your Intuitive Journey. As you may have read before, everything in the game is intuitive so in a way, the less we KNOW the better we go. But yeah, like everything in the game, also the website is learning itself step by step so here is some basic information. Let’s see what happens.",
            "html": "text",
            "className": "",
            "style": {},
            "url": ""
        },
        {
            "key": "MC4wMDcxMjYxMTE1NTA4MjAxMDI=",
            "text": "All souls are motivated by the thing they’re LACKing - that’s why it motivates them.",
            "html": "text",
            "className": "",
            "style": {},
            "url": ""
        },
        {
            "key": "MC42NzEwNjUyNjg2NTg5ODQ2",
            "text": "Gul",
            "html": "highlight",
            "className": "",
            "style": {
                "color": "orange"
            },
            "url": ""
        },
        {
            "key": "MC43NjA0OTgzNTUwMDI2ODg1",
            "text": " - The Victim spirit",
            "html": "highlight",
            "className": "",
            "style": {},
            "url": ""
        },
        {
            "key": "MC42MjAyMDI0NDE2OTgyNDI2",
            "text": " is driven by Control, He’s natural gender is male but can of course be born as a woman too. The victim’s role in the group is to unite them through some kind of weakness. His color is Yellow and his Element is Fire.",
            "html": "text",
            "className": "inline",
            "style": {},
            "url": ""
        }
    ]'::json
);
