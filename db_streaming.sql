CREATE TABLE public.streaming (
    id integer NOT NULL,
    song_id integer NOT NULL,
    user_id integer,
    start_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp without time zone,
    status character varying(10),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT streaming_status_check CHECK (((status)::text = ANY ((ARRAY['playing'::character varying, 'paused'::character varying, 'stopped'::character varying])::text[])))
);


ALTER TABLE public.streaming OWNER TO postgres;

CREATE SEQUENCE public.streaming_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.streaming_id_seq OWNER TO postgres;

ALTER SEQUENCE public.streaming_id_seq OWNED BY public.streaming.id;


ALTER TABLE ONLY public.streaming ALTER COLUMN id SET DEFAULT nextval('public.streaming_id_seq'::regclass);


COPY public.streaming (id, song_id, user_id, start_time, end_time, status, created_at, updated_at) FROM stdin;
2	102	2	2024-11-06 09:30:00	2024-11-06 09:45:00	stopped	2024-11-06 09:30:00	2024-11-06 09:45:00
3	103	\N	2024-11-06 08:00:00	2024-11-06 08:30:00	stopped	2024-11-06 08:00:00	2024-11-06 08:30:00
6	4	1	2024-11-23 02:11:42.432	\N	playing	2024-11-23 02:11:42.432	2024-11-23 02:11:42.432
4	104	3	2024-11-06 10:15:00	\N	paused	2024-11-06 10:15:00	2024-11-06 10:20:00
5	105	3	2024-11-06 09:00:00	2024-11-06 09:50:00	stopped	2024-11-06 09:00:00	2024-11-06 09:50:00
1	4	4	2024-11-06 10:00:00	\N	playing	2024-11-06 10:00:00	2024-11-06 10:00:00
\.


ALTER TABLE ONLY public.streaming
    ADD CONSTRAINT streaming_pkey PRIMARY KEY (id);


