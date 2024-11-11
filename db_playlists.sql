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
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS playlists_id_seq;

-- Table Definition
CREATE TABLE "public"."playlists" (
    "id" int4 NOT NULL DEFAULT nextval('playlists_id_seq'::regclass),
    "playlist_name" varchar(100) NOT NULL,
    "description" varchar(255),
    "user_id" int4 NOT NULL,
    "is_public" bool DEFAULT true,
    "image" varchar(255),
    "create_date" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."playlist_songs" ("id", "playlist_id", "song_id", "user_id") VALUES
(1, 1, 1, 4);


INSERT INTO "public"."playlists" ("id", "playlist_name", "description", "user_id", "is_public", "image", "create_date") VALUES
(1, 'Rock Classics', 'A playlist of timeless rock songs.', 1, 't', 'rock_classics.jpg', '2024-10-31 03:38:44.273127');
INSERT INTO "public"."playlists" ("id", "playlist_name", "description", "user_id", "is_public", "image", "create_date") VALUES
(3, 'Pop Hits', 'Catchy pop songs from recent years.', 3, 't', 'pop_hits.jpg', '2024-10-31 03:38:44.273127');
INSERT INTO "public"."playlists" ("id", "playlist_name", "description", "user_id", "is_public", "image", "create_date") VALUES
(4, 'Testing Playlist', NULL, 2, 't', NULL, '2024-11-04 02:24:18.279');
INSERT INTO "public"."playlists" ("id", "playlist_name", "description", "user_id", "is_public", "image", "create_date") VALUES
(5, 'Testing Playlist　2', NULL, 2, 't', NULL, '2024-11-04 02:25:40.636'),
(6, 'Testing Playlist　2', NULL, 2, 't', NULL, '2024-11-04 02:38:54.784'),
(7, 'Testing Playlist　2', NULL, 2, 't', NULL, '2024-11-04 02:40:24.561'),
(9, 'Put Test', 'Put Test', 4, 't', 'Put', '2024-11-04 04:46:16.221'),
(2, 'Chill Jazz', 'Relaxing jazz tunes for a quiet evening.', 2, 'f', 'chill_jazz.jpg', '2024-10-31 03:38:44.273127'),
(11, 'Put Test', 'Put Test', 4, 't', 'Put', '2024-11-11 06:20:32.341');
