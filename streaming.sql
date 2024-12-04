-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS streaming_id_seq;

-- Table Definition
CREATE TABLE "public"."streaming" (
    "id" int4 NOT NULL DEFAULT nextval('streaming_id_seq'::regclass),
    "song_id" int4 NOT NULL,
    "user_id" int4,
    "start_time" timestamp DEFAULT CURRENT_TIMESTAMP,
    "end_time" timestamp,
    "status" varchar(10),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

