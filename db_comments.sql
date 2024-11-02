
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS comments_id_seq;

-- Table Definition
CREATE TABLE "public"."comments" (
    "id" int4 NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "discuss_id" int4,
    "content" text NOT NULL,
    "song_id" int4,
    "discuss_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);