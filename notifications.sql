-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS notifications_id_seq;

-- Table Definition
CREATE TABLE "public"."notifications" (
    "id" int4 NOT NULL DEFAULT nextval('notifications_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "message" text NOT NULL,
    "is_read" bool DEFAULT false,
    "timestamp" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

