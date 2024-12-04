-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" varchar(100) NOT NULL,
    "email" varchar(100) NOT NULL,
    "password" varchar(255) NOT NULL,
    "avatar" varchar(255),
    "description" text,
    "banner" varchar(255),
    "nationality" varchar(100),
    "role" varchar(50),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 'avatar1.jpg', 'Music lover and playlist curator', 'banner1.jpg', 'USA', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(2, 'Alice Smith', 'alicesmith@example.com', 'password456', 'avatar2.jpg', 'Enjoys indie and alternative music', 'banner2.jpg', 'Canada', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(3, 'Bob Johnson', 'bobjohnson@example.com', 'password789', 'avatar3.jpg', 'Fan of classic rock and blues', 'banner3.jpg', 'UK', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(4, 'test', 'test@gmail.com', '1234', '1234', 'Tester is here', '1234', 'Canada', 'user'),
(5, 'test streaming', 'testStreaming@gmail.com', '1234', '1234', 'Test streaming', '1234', 'Canada', 'user');