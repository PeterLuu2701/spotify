-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS comments_id_seq;

-- Table Definition
CREATE TABLE "public"."comments" (
    "id" int4 NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "content" text NOT NULL,
    "song_id" int4 NOT NULL,
    "comment_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS follows_id_seq;

-- Table Definition
CREATE TABLE "public"."follows" (
    "id" int4 NOT NULL DEFAULT nextval('follows_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "artist_id" int4 NOT NULL,
    "follow_date" date,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS friends_id_seq;

-- Table Definition
CREATE TABLE "public"."friends" (
    "id" int4 NOT NULL DEFAULT nextval('friends_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "friend_id" int4 NOT NULL,
    "accept_date" date,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."comments" ("id", "user_id", "content", "song_id", "comment_date") VALUES
(1, 4, 'Test edit', 7, '2024-11-14 03:44:19.131');
INSERT INTO "public"."comments" ("id", "user_id", "content", "song_id", "comment_date") VALUES
(4, 4, 'Test', 7, '2024-11-14 03:46:23.247');
INSERT INTO "public"."comments" ("id", "user_id", "content", "song_id", "comment_date") VALUES
(5, 4, 'Test', 7, '2024-11-14 03:46:23.941');

INSERT INTO "public"."follows" ("id", "user_id", "artist_id", "follow_date") VALUES
(2, 4, 2, '2024-11-14');



