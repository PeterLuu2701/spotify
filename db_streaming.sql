-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS albums_id_seq;

-- Table Definition
CREATE TABLE "public"."albums" (
    "id" int4 NOT NULL DEFAULT nextval('albums_id_seq'::regclass),
    "title" varchar(100) NOT NULL,
    "release_date" date,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS genres_id_seq;

-- Table Definition
CREATE TABLE "public"."genres" (
    "id" int4 NOT NULL DEFAULT nextval('genres_id_seq'::regclass),
    "genre_name" varchar(50) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS songs_id_seq;

-- Table Definition
CREATE TABLE "public"."songs" (
    "id" int4 NOT NULL DEFAULT nextval('songs_id_seq'::regclass),
    "song_name" varchar(100) NOT NULL,
    "description" text,
    "album_id" int4,
    "duration" time,
    "release_date" date,
    "image" varchar(255),
    "genre_id" int4,
    CONSTRAINT "songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE SET NULL,
    CONSTRAINT "songs_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id"),
    PRIMARY KEY ("id")
);

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

INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(1, 'Abbey Road', '1969-09-26');
INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(2, 'Kind of Blue', '1959-08-17');
INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(3, '1989', '2014-10-27');
INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(4, 'Discovery', '2001-03-12');

INSERT INTO "public"."genres" ("id", "genre_name") VALUES
(1, 'Rock');
INSERT INTO "public"."genres" ("id", "genre_name") VALUES
(2, 'Pop');
INSERT INTO "public"."genres" ("id", "genre_name") VALUES
(3, 'Jazz');
INSERT INTO "public"."genres" ("id", "genre_name") VALUES
(4, 'Hip Hop'),
(5, 'Classical'),
(6, 'Electronic');

INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(1, 'Come Together', 'A popular song by The Beatles', 1, '00:04:20', '1969-09-26', 'come_together.jpg', 2);
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(2, 'So What', 'A jazz standard by Miles Davis', 2, '00:09:22', '1959-08-17', 'so_what.jpg', 3);
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(3, 'One More Time', 'An iconic song by Daft Punk', 4, '00:05:20', '2001-03-12', 'one_more_time.jpg', 1);
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(4, 'Shake It Off', 'A hit pop song by Taylor Swift', 3, '00:03:39', '2014-10-27', 'shake_it_off.jpg', 2);

INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 'avatar1.jpg', 'Music lover and playlist curator', 'banner1.jpg', 'USA', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(2, 'Alice Smith', 'alicesmith@example.com', 'password456', 'avatar2.jpg', 'Enjoys indie and alternative music', 'banner2.jpg', 'Canada', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(3, 'Bob Johnson', 'bobjohnson@example.com', 'password789', 'avatar3.jpg', 'Fan of classic rock and blues', 'banner3.jpg', 'UK', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(4, 'test', 'test@gmail.com', '1234', '1234', 'Tester is here', '1234', 'Canada', 'user');
