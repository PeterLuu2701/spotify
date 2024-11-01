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
CREATE SEQUENCE IF NOT EXISTS comments_id_seq;

-- Table Definition
CREATE TABLE "public"."comments" (
    "id" int4 NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "discuss_id" int4,
    "content" text NOT NULL,
    "song_id" int4,
    "discuss_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    CONSTRAINT "comments_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE CASCADE,
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


-- Indices
CREATE UNIQUE INDEX genres_genre_name_key ON public.genres USING btree (genre_name);

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
    CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS playlist_songs_id_seq;

-- Table Definition
CREATE TABLE "public"."playlist_songs" (
    "id" int4 NOT NULL DEFAULT nextval('playlist_songs_id_seq'::regclass),
    "playlist_id" int4 NOT NULL,
    "song_id" int4 NOT NULL,
    "user_id" int4 NOT NULL,
    CONSTRAINT "playlist_songs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE CASCADE,
    CONSTRAINT "playlist_songs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE CASCADE,
    CONSTRAINT "playlist_songs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS playlists_id_seq;

-- Table Definition
CREATE TABLE "public"."playlists" (
    "id" int4 NOT NULL DEFAULT nextval('playlists_id_seq'::regclass),
    "playlist_name" varchar(100) NOT NULL,
    "description" text,
    "user_id" int4 NOT NULL,
    "is_public" bool DEFAULT true,
    "image" varchar(255),
    "create_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "playlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
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
    CONSTRAINT "songs_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE SET NULL,
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


-- Indices
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

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

INSERT INTO "public"."notifications" ("id", "user_id", "message", "is_read", "timestamp") VALUES
(1, 1, 'Your playlist "Rock Classics" has gained 5 new followers!', 'f', '2024-10-30 08:00:00');
INSERT INTO "public"."notifications" ("id", "user_id", "message", "is_read", "timestamp") VALUES
(2, 2, 'New song added to "Chill Jazz" playlist.', 't', '2024-10-29 17:00:00');
INSERT INTO "public"."notifications" ("id", "user_id", "message", "is_read", "timestamp") VALUES
(3, 3, 'You have a new comment on "Shake It Off".', 'f', '2024-10-30 09:30:00');



INSERT INTO "public"."playlists" ("id", "playlist_name", "description", "user_id", "is_public", "image", "create_date") VALUES
(1, 'Rock Classics', 'A playlist of timeless rock songs.', 1, 't', 'rock_classics.jpg', '2024-10-31 03:38:44.273127');
INSERT INTO "public"."playlists" ("id", "playlist_name", "description", "user_id", "is_public", "image", "create_date") VALUES
(2, 'Chill Jazz', 'Relaxing jazz tunes for a quiet evening.', 2, 't', 'chill_jazz.jpg', '2024-10-31 03:38:44.273127');
INSERT INTO "public"."playlists" ("id", "playlist_name", "description", "user_id", "is_public", "image", "create_date") VALUES
(3, 'Pop Hits', 'Catchy pop songs from recent years.', 3, 't', 'pop_hits.jpg', '2024-10-31 03:38:44.273127');

INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(1, 1, 1);
INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(2, 2, 2);
INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(3, 3, 3);
INSERT INTO "public"."song_artists" ("id", "song_id", "artist_id") VALUES
(4, 4, 4);

INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image") VALUES
(1, 'Come Together', 'A popular song by The Beatles', 1, '00:04:20', '1969-09-26', 'come_together.jpg');
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image") VALUES
(2, 'So What', 'A jazz standard by Miles Davis', 2, '00:09:22', '1959-08-17', 'so_what.jpg');
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image") VALUES
(3, 'Shake It Off', 'A hit pop song by Taylor Swift', 3, '00:03:39', '2014-10-27', 'shake_it_off.jpg');
INSERT INTO "public"."songs" ("id", "song_name", "description", "album_id", "duration", "release_date", "image") VALUES
(4, 'One More Time', 'An iconic song by Daft Punk', 4, '00:05:20', '2001-03-12', 'one_more_time.jpg');

INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 'avatar1.jpg', 'Music lover and playlist curator', 'banner1.jpg', 'USA', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(2, 'Alice Smith', 'alicesmith@example.com', 'password456', 'avatar2.jpg', 'Enjoys indie and alternative music', 'banner2.jpg', 'Canada', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(3, 'Bob Johnson', 'bobjohnson@example.com', 'password789', 'avatar3.jpg', 'Fan of classic rock and blues', 'banner3.jpg', 'UK', 'user');
INSERT INTO "public"."users" ("id", "name", "email", "password", "avatar", "description", "banner", "nationality", "role") VALUES
(4, 'test', 'test@gmail.com', '1234', '1234', 'Tester is here', '1234', 'Canada', 'user');
