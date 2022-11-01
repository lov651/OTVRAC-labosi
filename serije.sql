--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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
-- Name: glumac; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.glumac (
    id_glumca integer NOT NULL,
    ime text,
    prezime text
);


ALTER TABLE public.glumac OWNER TO postgres;

--
-- Name: glumac_serija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.glumac_serija (
    id_serije integer NOT NULL,
    id_glumca integer NOT NULL
);


ALTER TABLE public.glumac_serija OWNER TO postgres;

--
-- Name: serija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.serija (
    id_serije integer NOT NULL,
    ime text,
    zanr text[],
    trajanje text,
    datum_izlaska date,
    godina_zavrsetka text,
    ocjena text,
    status text,
    broj_sezona integer,
    broj_epizoda integer,
    jezik text
);


ALTER TABLE public.serija OWNER TO postgres;

--
-- Data for Name: glumac; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.glumac (id_glumca, ime, prezime) FROM stdin;
1	Hailee	Steinfeld
2	Ella	Purnell
3	Kevin	Alejandro
4	Katie	Leung
5	Jason	Spisak
6	Harry	Lloyd
7	Mick	Wingert
8	Lee	Jung-jae
9	Park	Hae-soo
10	Wi	Ha-joon
11	HoYeon	Jung
12	O	Yeong-su
13	Heo	Sung-tae
14	Anupam	Tripathi
15	Bryan	Cranston
16	Aaron	Paul
17	Anna	Gunn
18	Dean	Norris
19	Betsy	Brandt
20	Bob	Odenkirk
21	Giancarlo	Esposito
22	Jonathan	Banks
23	Michele	Rech
24	Valerio	Mastandrea
25	Paolo	Vivio
26	Veronica	Puccio
27	Chiara	Gioncardi
28	Hugh	Dancy
29	Mads	Mikkelsen
30	Caroline	Dhavernas
31	Laurence	Fishburne
32	Gillian	Anderson
33	Raul	Esparza
34	Matthew	McConaughey
35	Woody	Harrelson
36	Michelle	Monaghan
37	Colin	Farrell
38	Vince	Vaughn
39	Rachel	McAdams
40	Taylor	Kitsch
41	Mahershala	Ali
42	Stephen	Dorff
43	Scoot	McNairy
44	Billy Bob	Thornton
45	Martin	Freeman
46	Patrick	Wilson
47	Kirsten	Dunst
48	Jesse	Plemons
49	Jean	Smart
50	Ewan	McGregor
51	Mary Elizabeth	Winstead
52	Carrie	Coon
53	David	Thewlis
54	Chris	Rock
55	Jason	Schwartzman
56	Jared	Harris
57	Tobias	Menzies
58	Ciaran	Hinds
59	Daniel	Brühl
60	Luke	Evans
61	Dakota	Fanning
62	Ted	Levine
63	Charlie	Cox
64	Eva	Green
65	Josh	Hartnett
66	Rory	Kinnear
67	Harry	Treadaway
68	Billie	Piper
69	Timothy	Dalton
70	Wagner	Moura
71	Boyd	Holbrook
72	Pedro	Pascal
73	Damian	Alcazar
74	Alberto	Ammann
75	Deborah Ann	Woll
76	Vincent	D Onofrio
77	Elden	Henson
78	Rosario	Dawson
79	Benedict	Cumberbatch
80	Mark	Gatiss
81	Una	Stubbs
82	Andrew	Scott
\.


--
-- Data for Name: glumac_serija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.glumac_serija (id_serije, id_glumca) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
2	8
2	9
2	10
2	11
2	12
2	13
2	14
3	15
3	16
3	17
3	18
3	19
3	20
3	21
3	22
4	23
4	24
4	25
4	26
4	27
5	28
5	29
5	30
5	31
5	32
5	33
6	34
6	35
6	36
6	37
6	38
6	39
6	40
6	41
6	42
6	43
7	44
7	45
7	46
7	47
7	48
7	49
7	50
7	51
7	52
7	53
7	54
7	55
8	56
8	57
8	58
9	59
9	60
9	61
9	62
10	64
10	65
10	66
10	67
10	68
10	69
11	70
11	71
11	72
11	73
11	74
12	63
12	75
12	76
12	77
12	78
13	79
13	80
13	81
13	82
13	45
\.


--
-- Data for Name: serija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.serija (id_serije, ime, zanr, trajanje, datum_izlaska, godina_zavrsetka, ocjena, status, broj_sezona, broj_epizoda, jezik) FROM stdin;
1	Arcane	{Action,Adventure,Animation,Steampunk}	39-44 minutes	2021-11-06	-	9	Ongoing	1	9	English
2	Squid Game	{Survival,Drama,Thriller}	32-63 minutes	2021-09-07	-	8	Ongoing	1	9	Korean
3	Breaking Bad	{"Crime drama",Thriller,"Serial drama","Black comedy"}	43-58 minutes	2008-01-20	2013	9.5	Finished	5	62	English
4	Tear Along the Dotted Line	{"Adult animation","Comedy drama"}	16-22 minutes	2021-11-19	2021	8.6	Finished	1	6	Italian
5	Hannibal	{"Psychological horror","Psychological thriller","Crime drama","Crime thriller"}	43 minutes	2013-04-04	2015	8.5	Finished	3	39	English
6	True Detective	{Anthology,"Crime drama",Detective,Mystery,Neo-noir,"Southern Gothic"}	54-87 minutes	2014-01-12	-	8.9	Ongoing	3	24	English
7	Fargo	{Anthology,"Crime drama",Noir,Thriller,"Black comedy"}	39-68 minutes	2014-04-15	-	8.9	Ongoing	4	41	English
8	The Terror	{Drama,Horror,"Psychological thriller"}	40-56 minutes	2018-03-25	2019	7.9	Finished	2	20	English
9	The Alienist	{"Period drama","Murder mystery","Psychological thriller"}	43-55 minutes	2018-01-21	2020	7.7	Finished	2	18	English
10	Penny Dreadful	{Drama,"Gothic horror",Thriller,"Dark fantasy","Historical fantasy"}	47-60 minutes	2014-05-11	2016	8.2	Finished	3	27	English
11	Narcos	{"Crime drama",Biographical}	43-60 minutes	2015-08-28	2017	8.8	Finished	3	30	Spanish
12	Daredevil	{"Crime drama",Action,"Legal drama",Superhero}	46-61 minutes	2015-04-10	2018	8.6	Finished	3	39	English
13	Sherlock	{Crime,Mystery,"Comedy drama"}	85-90 minutes	2010-07-25	2017	9.1	Finished	4	13	English
\.


--
-- Name: glumac glumac_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glumac
    ADD CONSTRAINT glumac_pkey PRIMARY KEY (id_glumca);


--
-- Name: glumac_serija glumac_serija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glumac_serija
    ADD CONSTRAINT glumac_serija_pkey PRIMARY KEY (id_serije, id_glumca);


--
-- Name: serija serija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serija
    ADD CONSTRAINT serija_pkey PRIMARY KEY (id_serije);


--
-- Name: glumac_serija id_glumac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glumac_serija
    ADD CONSTRAINT id_glumac FOREIGN KEY (id_glumca) REFERENCES public.glumac(id_glumca) NOT VALID;


--
-- Name: glumac_serija id_serija; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.glumac_serija
    ADD CONSTRAINT id_serija FOREIGN KEY (id_serije) REFERENCES public.serija(id_serije) NOT VALID;


--
-- PostgreSQL database dump complete
--

