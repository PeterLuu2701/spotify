-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS album_songs_id_seq;

-- Table Definition
CREATE TABLE "public"."album_songs" (
    "id" int4 NOT NULL DEFAULT nextval('album_songs_id_seq'::regclass),
    "album_id" int4 NOT NULL,
    "song_id" int4 NOT NULL,
    CONSTRAINT "album_songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE CASCADE,
    CONSTRAINT "album_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

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
CREATE SEQUENCE IF NOT EXISTS artist_genres_id_seq;

-- Table Definition
CREATE TABLE "public"."artist_genres" (
    "id" int4 NOT NULL DEFAULT nextval('artist_genres_id_seq'::regclass),
    "artist_id" int4 NOT NULL,
    "genre_id" int4 NOT NULL,
    CONSTRAINT "artist_genres_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE CASCADE,
    CONSTRAINT "artist_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS artists_id_seq;

-- Table Definition
CREATE TABLE "public"."artists" (
    "id" int4 NOT NULL DEFAULT nextval('artists_id_seq'::regclass),
    "artist_name" varchar(100) NOT NULL,
    "bio" text,
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
CREATE SEQUENCE IF NOT EXISTS song_artists_id_seq;

-- Table Definition
CREATE TABLE "public"."song_artists" (
    "id" int4 NOT NULL DEFAULT nextval('song_artists_id_seq'::regclass),
    "song_id" int4 NOT NULL,
    "artist_id" int4 NOT NULL,
    CONSTRAINT "song_artists_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE CASCADE,
    CONSTRAINT "song_artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE CASCADE,
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
    CONSTRAINT "fk_genre" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."album_songs" ("id", "album_id", "song_id") VALUES
(1, 1, 1);
INSERT INTO "public"."album_songs" ("id", "album_id", "song_id") VALUES
(2, 2, 2);
INSERT INTO "public"."album_songs" ("id", "album_id", "song_id") VALUES
(3, 3, 3);
INSERT INTO "public"."album_songs" ("id", "album_id", "song_id") VALUES
(4, 4, 4);

INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(1, 'Abbey Road', '1969-09-26');
INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(2, 'Kind of Blue', '1959-08-17');
INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(3, '1989', '2014-10-27');
INSERT INTO "public"."albums" ("id", "title", "release_date") VALUES
(4, 'Discovery', '2001-03-12');

INSERT INTO "public"."artist_genres" ("id", "artist_id", "genre_id") VALUES
(1, 1, 1);
INSERT INTO "public"."artist_genres" ("id", "artist_id", "genre_id") VALUES
(2, 2, 3);
INSERT INTO "public"."artist_genres" ("id", "artist_id", "genre_id") VALUES
(3, 3, 2);
INSERT INTO "public"."artist_genres" ("id", "artist_id", "genre_id") VALUES
(4, 4, 6);

INSERT INTO "public"."artists" ("id", "artist_name", "bio") VALUES
(1, 'The Beatles', 'Legendary British rock band from the 60s.');
INSERT INTO "public"."artists" ("id", "artist_name", "bio") VALUES
(2, 'Miles Davis', 'Pioneering American jazz trumpeter and composer.');
INSERT INTO "public"."artists" ("id", "artist_name", "bio") VALUES
(3, 'Taylor Swift', 'Popular American singer-songwriter known for pop and country music.');
INSERT INTO "public"."artists" ("id", "artist_name", "bio") VALUES
(4, 'Daft Punk', 'French electronic music duo known for their distinct sound.');

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

INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(1, 1, 1);
INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(2, 2, 2);
INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(3, 3, 3);
INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(4, 4, 4);

INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(1, 'Come Together', 'A popular song by The Beatles', 1, '00:04:20', '1969-09-26', 'come_together.jpg', 2);
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(2, 'So What', 'A jazz standard by Miles Davis', 2, '00:09:22', '1959-08-17', 'so_what.jpg', 3);
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(4, 'One More Time', 'An iconic song by Daft Punk', 4, '00:05:20', '2001-03-12', 'one_more_time.jpg', 1);
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image", "genre_id") VALUES
(3, 'Shake It Off', 'A hit pop song by Taylor Swift', 3, '00:03:39', '2014-10-27', 'shake_it_off.jpg', 2);
