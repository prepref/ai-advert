--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-21 07:49:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 217 (class 1259 OID 16405)
-- Name: rules; Type: TABLE; Schema: public; Owner: pg_read_all_data
--

CREATE TABLE public.rules (
    type character varying(100) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.rules OWNER TO pg_read_all_data;

--
-- TOC entry 4840 (class 0 OID 16405)
-- Dependencies: 217
-- Data for Name: rules; Type: TABLE DATA; Schema: public; Owner: pg_read_all_data
--

COPY public.rules (type, description) FROM stdin;
Продающий текст:2	Боль/Обещание/Желание/Крючок->Предложение + призыв к действию.
Продающий текст:1	Заголовок->Призыв к действию->Преимущества->Дожимной призыв к действию.
Продающий текст:0	Боль/Обещание/Желание/Крючок->Усиление боли->Возможности/Результат->Решение->Призыв к действие->Возражения/Преимущества/Кейсы->Еще раз призыв к действию.
Защитный текст:0	-
Текст-сравнение:0	-
Имиджевый текст:0	-
Промо-текст:0	-
\.


--
-- TOC entry 4694 (class 2606 OID 16413)
-- Name: rules rules_pkey; Type: CONSTRAINT; Schema: public; Owner: pg_read_all_data
--

ALTER TABLE ONLY public.rules
    ADD CONSTRAINT rules_pkey PRIMARY KEY (type);


-- Completed on 2024-12-21 07:49:25

--
-- PostgreSQL database dump complete
--

