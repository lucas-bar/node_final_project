--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-12-30 18:08:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16522)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    course_id integer NOT NULL,
    subject_id integer,
    level_id integer,
    course_name character varying(255),
    pdf_link character varying(255)
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16521)
-- Name: courses_course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_course_id_seq OWNER TO postgres;

--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 218
-- Name: courses_course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_course_id_seq OWNED BY public.courses.course_id;


--
-- TOC entry 217 (class 1259 OID 16489)
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16488)
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subjects_id_seq OWNER TO postgres;

--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 216
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- TOC entry 215 (class 1259 OID 16462)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16461)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3185 (class 2604 OID 16525)
-- Name: courses course_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN course_id SET DEFAULT nextval('public.courses_course_id_seq'::regclass);


--
-- TOC entry 3184 (class 2604 OID 16492)
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 16465)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3343 (class 0 OID 16522)
-- Dependencies: 219
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (course_id, subject_id, level_id, course_name, pdf_link) FROM stdin;
7	3	1	Cours de Anglais Débutant	https://www.dropbox.com/scl/fi/df14hdhibp7emqz0ogrzi/Anglais_LVL1.pdf?dl=1
8	3	2	Cours de Anglais Intermédiaire	https://www.dropbox.com/scl/fi/v6gzs6zozl3jxxisrih76/Anglais_LVL2.pdf?dl=1
9	3	3	Cours de Anglais Avancé	https://www.dropbox.com/scl/fi/quy45ptbxuswwuufyfdqo/Anglais_LVL3.pdf?dl=1
2	1	2	Cours de Maths Intermédiaire	https://www.dropbox.com/scl/fi/nqvwnc3hvqc77cxrrnuyb/Maths_LVL2.pdf?dl=1
3	1	3	Cours de Maths Avancé	https://www.dropbox.com/scl/fi/4goig53j2owaaffeyctb3/Maths_LVL3.pdf?dl=1
4	2	1	Cours de Node Débutant	https://www.dropbox.com/scl/fi/lrygi9r5g82f5o1ckbi6z/Node_LVL1.pdf?dl=1
6	2	3	Cours de Node Avancé	https://www.dropbox.com/scl/fi/tmmikqzqssthtcxl1ojip/Node_LVL3.pdf?dl=1
10	4	1	Cours de Python Débutant	https://www.dropbox.com/scl/fi/g9ni7kmjmvcmnwerfousf/Python_LVL1.pdf?dl=1
11	4	2	Cours de Python Intermédiaire	https://www.dropbox.com/scl/fi/07y0w1xjc1kowei9slgtw/Python_LVL2.pdf?dl=1
12	4	3	Cours de Python Avancé	https://www.dropbox.com/scl/fi/myx19vah8ejkcy1vcw8qy/Python_LVL3.pdf?dl=1
5	2	2	Cours de Node Intermédiaire	https://www.dropbox.com/scl/fi/agtyme2yufo8p4tyddwmj/Node_LVL2.pdf?dl=1
1	1	1	Cours de Maths Débutant	https://www.dropbox.com/scl/fi/qeirztiku088xs0w0bm6v/Maths_LVL1.pdf?dl=1
\.


--
-- TOC entry 3341 (class 0 OID 16489)
-- Dependencies: 217
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subjects (id, name) FROM stdin;
1	Maths
3	Anglais
2	Node
4	Python
\.


--
-- TOC entry 3339 (class 0 OID 16462)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password) FROM stdin;
1	valeur_username	valeur_email	valeur_password
2	test	test@example.com	password
3	NouvelUtilisateur	nouvelutilisateur@example.com	motdepasse
\.


--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 218
-- Name: courses_course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_course_id_seq', 12, true);


--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 216
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subjects_id_seq', 4, true);


--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- TOC entry 3195 (class 2606 OID 16529)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (course_id);


--
-- TOC entry 3193 (class 2606 OID 16494)
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- TOC entry 3187 (class 2606 OID 16471)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3189 (class 2606 OID 16467)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3191 (class 2606 OID 16469)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


-- Completed on 2023-12-30 18:08:32

--
-- PostgreSQL database dump complete
--

