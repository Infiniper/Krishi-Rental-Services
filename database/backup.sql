--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.4 (Homebrew)

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
-- Name: adminactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adminactions (
    actionid integer NOT NULL,
    adminid integer,
    targetuserid integer,
    actiontype character varying(50) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.adminactions OWNER TO postgres;

--
-- Name: adminactions_actionid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adminactions_actionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.adminactions_actionid_seq OWNER TO postgres;

--
-- Name: adminactions_actionid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adminactions_actionid_seq OWNED BY public.adminactions.actionid;


--
-- Name: analytics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analytics (
    analyticsid integer NOT NULL,
    metricname character varying(100) NOT NULL,
    value numeric(15,6) NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.analytics OWNER TO postgres;

--
-- Name: analytics_analyticsid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.analytics_analyticsid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.analytics_analyticsid_seq OWNER TO postgres;

--
-- Name: analytics_analyticsid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.analytics_analyticsid_seq OWNED BY public.analytics.analyticsid;


--
-- Name: bookinglogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookinglogs (
    logid integer NOT NULL,
    bookingid integer,
    event text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bookinglogs OWNER TO postgres;

--
-- Name: bookinglogs_logid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookinglogs_logid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookinglogs_logid_seq OWNER TO postgres;

--
-- Name: bookinglogs_logid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookinglogs_logid_seq OWNED BY public.bookinglogs.logid;


--
-- Name: bookingpricing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookingpricing (
    pricingid integer NOT NULL,
    bookingid integer,
    basefare numeric(10,2) NOT NULL,
    surgemultiplier numeric(3,2) DEFAULT 1.0,
    finalprice numeric(10,2) GENERATED ALWAYS AS ((basefare * surgemultiplier)) STORED
);


ALTER TABLE public.bookingpricing OWNER TO postgres;

--
-- Name: bookingpricing_pricingid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookingpricing_pricingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookingpricing_pricingid_seq OWNER TO postgres;

--
-- Name: bookingpricing_pricingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookingpricing_pricingid_seq OWNED BY public.bookingpricing.pricingid;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    bookingid integer NOT NULL,
    clientid integer,
    vehicleid integer,
    status character varying(50) DEFAULT 'Scheduled'::character varying,
    scheduledtime timestamp without time zone NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT bookings_status_check CHECK (((status)::text = ANY ((ARRAY['Scheduled'::character varying, 'Completed'::character varying, 'Cancelled'::character varying])::text[])))
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_bookingid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_bookingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_bookingid_seq OWNER TO postgres;

--
-- Name: bookings_bookingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_bookingid_seq OWNED BY public.bookings.bookingid;


--
-- Name: disputes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disputes (
    disputeid integer NOT NULL,
    rideid integer,
    userid integer,
    issue text NOT NULL,
    status character varying(50) DEFAULT 'Open'::character varying,
    resolution text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT disputes_status_check CHECK (((status)::text = ANY ((ARRAY['Open'::character varying, 'Resolved'::character varying, 'Rejected'::character varying])::text[])))
);


ALTER TABLE public.disputes OWNER TO postgres;

--
-- Name: disputes_disputeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disputes_disputeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.disputes_disputeid_seq OWNER TO postgres;

--
-- Name: disputes_disputeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disputes_disputeid_seq OWNED BY public.disputes.disputeid;


--
-- Name: driverprofiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driverprofiles (
    driverid integer NOT NULL,
    licensenumber character varying(50) NOT NULL,
    experience integer,
    backgroundcheckstatus boolean DEFAULT false,
    CONSTRAINT driverprofiles_experience_check CHECK ((experience >= 0))
);


ALTER TABLE public.driverprofiles OWNER TO postgres;

--
-- Name: driverratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driverratings (
    ratingid integer NOT NULL,
    driverid integer,
    clientid integer,
    stars integer,
    review text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT driverratings_stars_check CHECK (((stars >= 1) AND (stars <= 5)))
);


ALTER TABLE public.driverratings OWNER TO postgres;

--
-- Name: driverratings_ratingid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.driverratings_ratingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.driverratings_ratingid_seq OWNER TO postgres;

--
-- Name: driverratings_ratingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.driverratings_ratingid_seq OWNED BY public.driverratings.ratingid;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    locationid integer NOT NULL,
    name character varying(100) NOT NULL,
    latitude numeric(10,6) NOT NULL,
    longitude numeric(10,6) NOT NULL
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_locationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_locationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_locationid_seq OWNER TO postgres;

--
-- Name: locations_locationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_locationid_seq OWNED BY public.locations.locationid;


--
-- Name: paymentlogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paymentlogs (
    logid integer NOT NULL,
    paymentid integer,
    event text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.paymentlogs OWNER TO postgres;

--
-- Name: paymentlogs_logid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paymentlogs_logid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paymentlogs_logid_seq OWNER TO postgres;

--
-- Name: paymentlogs_logid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paymentlogs_logid_seq OWNED BY public.paymentlogs.logid;


--
-- Name: paymentmethods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paymentmethods (
    methodid integer NOT NULL,
    methodname character varying(50) NOT NULL,
    provider character varying(50) NOT NULL
);


ALTER TABLE public.paymentmethods OWNER TO postgres;

--
-- Name: paymentmethods_methodid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paymentmethods_methodid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paymentmethods_methodid_seq OWNER TO postgres;

--
-- Name: paymentmethods_methodid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paymentmethods_methodid_seq OWNED BY public.paymentmethods.methodid;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    paymentid integer NOT NULL,
    rideid integer,
    amount numeric(10,2) NOT NULL,
    paymentmethod integer,
    status character varying(50) DEFAULT 'Pending'::character varying,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT payments_status_check CHECK (((status)::text = ANY ((ARRAY['Pending'::character varying, 'Completed'::character varying, 'Failed'::character varying])::text[])))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_paymentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_paymentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_paymentid_seq OWNER TO postgres;

--
-- Name: payments_paymentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_paymentid_seq OWNED BY public.payments.paymentid;


--
-- Name: promocodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promocodes (
    promoid integer NOT NULL,
    code character varying(50) NOT NULL,
    discounttype character varying(50) NOT NULL,
    discountvalue numeric(10,2) NOT NULL,
    expirydate date NOT NULL,
    usagelimit integer NOT NULL,
    CONSTRAINT promocodes_discounttype_check CHECK (((discounttype)::text = ANY ((ARRAY['Flat'::character varying, 'Percentage'::character varying])::text[])))
);


ALTER TABLE public.promocodes OWNER TO postgres;

--
-- Name: promocodes_promoid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promocodes_promoid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promocodes_promoid_seq OWNER TO postgres;

--
-- Name: promocodes_promoid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promocodes_promoid_seq OWNED BY public.promocodes.promoid;


--
-- Name: ridelogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ridelogs (
    logid integer NOT NULL,
    rideid integer,
    event text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ridelogs OWNER TO postgres;

--
-- Name: ridelogs_logid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ridelogs_logid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ridelogs_logid_seq OWNER TO postgres;

--
-- Name: ridelogs_logid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ridelogs_logid_seq OWNED BY public.ridelogs.logid;


--
-- Name: riderequests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riderequests (
    requestid integer NOT NULL,
    clientid integer,
    startlocation character varying(255) NOT NULL,
    endlocation character varying(255) NOT NULL,
    preferredvehicletype integer,
    status character varying(50) DEFAULT 'Pending'::character varying,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT riderequests_status_check CHECK (((status)::text = ANY ((ARRAY['Pending'::character varying, 'Accepted'::character varying, 'Cancelled'::character varying])::text[])))
);


ALTER TABLE public.riderequests OWNER TO postgres;

--
-- Name: riderequests_requestid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.riderequests_requestid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.riderequests_requestid_seq OWNER TO postgres;

--
-- Name: riderequests_requestid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.riderequests_requestid_seq OWNED BY public.riderequests.requestid;


--
-- Name: rides; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rides (
    rideid integer NOT NULL,
    clientid integer,
    driverid integer,
    vehicleid integer,
    startlocation character varying(255) NOT NULL,
    endlocation character varying(255) NOT NULL,
    status character varying(50) DEFAULT 'Ongoing'::character varying,
    fare numeric(10,2) NOT NULL,
    surgemultiplier numeric(3,2) DEFAULT 1.0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT rides_status_check CHECK (((status)::text = ANY ((ARRAY['Ongoing'::character varying, 'Completed'::character varying, 'Cancelled'::character varying])::text[])))
);


ALTER TABLE public.rides OWNER TO postgres;

--
-- Name: rides_rideid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rides_rideid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rides_rideid_seq OWNER TO postgres;

--
-- Name: rides_rideid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rides_rideid_seq OWNED BY public.rides.rideid;


--
-- Name: ridezones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ridezones (
    zoneid integer NOT NULL,
    name character varying(100) NOT NULL,
    boundaries text NOT NULL,
    demandlevel integer DEFAULT 1,
    CONSTRAINT ridezones_demandlevel_check CHECK (((demandlevel >= 1) AND (demandlevel <= 5)))
);


ALTER TABLE public.ridezones OWNER TO postgres;

--
-- Name: ridezones_zoneid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ridezones_zoneid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ridezones_zoneid_seq OWNER TO postgres;

--
-- Name: ridezones_zoneid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ridezones_zoneid_seq OWNED BY public.ridezones.zoneid;


--
-- Name: surgepricing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.surgepricing (
    surgeid integer NOT NULL,
    zone character varying(100) NOT NULL,
    timeslot character varying(50) NOT NULL,
    multiplier numeric(3,2) NOT NULL
);


ALTER TABLE public.surgepricing OWNER TO postgres;

--
-- Name: surgepricing_surgeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.surgepricing_surgeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.surgepricing_surgeid_seq OWNER TO postgres;

--
-- Name: surgepricing_surgeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.surgepricing_surgeid_seq OWNED BY public.surgepricing.surgeid;


--
-- Name: userpromos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userpromos (
    userpromoid integer NOT NULL,
    userid integer,
    promoid integer,
    usedat timestamp without time zone
);


ALTER TABLE public.userpromos OWNER TO postgres;

--
-- Name: userpromos_userpromoid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userpromos_userpromoid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.userpromos_userpromoid_seq OWNER TO postgres;

--
-- Name: userpromos_userpromoid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userpromos_userpromoid_seq OWNED BY public.userpromos.userpromoid;


--
-- Name: userroles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userroles (
    roleid integer NOT NULL,
    rolename character varying(50) NOT NULL
);


ALTER TABLE public.userroles OWNER TO postgres;

--
-- Name: userroles_roleid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userroles_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.userroles_roleid_seq OWNER TO postgres;

--
-- Name: userroles_roleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userroles_roleid_seq OWNED BY public.userroles.roleid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    name character varying(100) NOT NULL,
    phonenumber character varying(15) NOT NULL,
    email character varying(100),
    roleid integer,
    rating numeric(3,2) DEFAULT 5.0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_userid_seq OWNER TO postgres;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: userverification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userverification (
    verificationid integer NOT NULL,
    userid integer,
    otp character varying(10) NOT NULL,
    expiry timestamp without time zone NOT NULL,
    verifiedat timestamp without time zone
);


ALTER TABLE public.userverification OWNER TO postgres;

--
-- Name: userverification_verificationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userverification_verificationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.userverification_verificationid_seq OWNER TO postgres;

--
-- Name: userverification_verificationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userverification_verificationid_seq OWNED BY public.userverification.verificationid;


--
-- Name: vehicleinsurance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicleinsurance (
    insuranceid integer NOT NULL,
    vehicleid integer,
    provider character varying(100) NOT NULL,
    policynumber character varying(50) NOT NULL,
    expirydate date NOT NULL
);


ALTER TABLE public.vehicleinsurance OWNER TO postgres;

--
-- Name: vehicleinsurance_insuranceid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicleinsurance_insuranceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicleinsurance_insuranceid_seq OWNER TO postgres;

--
-- Name: vehicleinsurance_insuranceid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicleinsurance_insuranceid_seq OWNED BY public.vehicleinsurance.insuranceid;


--
-- Name: vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicles (
    vehicleid integer NOT NULL,
    ownerid integer,
    typeid integer,
    model character varying(100) NOT NULL,
    registrationnumber character varying(50) NOT NULL,
    status character varying(50) DEFAULT 'Available'::character varying,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT vehicles_status_check CHECK (((status)::text = ANY ((ARRAY['Available'::character varying, 'Booked'::character varying, 'Inactive'::character varying])::text[])))
);


ALTER TABLE public.vehicles OWNER TO postgres;

--
-- Name: vehicles_vehicleid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicles_vehicleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicles_vehicleid_seq OWNER TO postgres;

--
-- Name: vehicles_vehicleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicles_vehicleid_seq OWNED BY public.vehicles.vehicleid;


--
-- Name: vehicletypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicletypes (
    typeid integer NOT NULL,
    typename character varying(50) NOT NULL,
    capacity integer NOT NULL,
    basefare numeric(10,2) NOT NULL
);


ALTER TABLE public.vehicletypes OWNER TO postgres;

--
-- Name: vehicletypes_typeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicletypes_typeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicletypes_typeid_seq OWNER TO postgres;

--
-- Name: vehicletypes_typeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicletypes_typeid_seq OWNED BY public.vehicletypes.typeid;


--
-- Name: adminactions actionid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adminactions ALTER COLUMN actionid SET DEFAULT nextval('public.adminactions_actionid_seq'::regclass);


--
-- Name: analytics analyticsid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics ALTER COLUMN analyticsid SET DEFAULT nextval('public.analytics_analyticsid_seq'::regclass);


--
-- Name: bookinglogs logid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookinglogs ALTER COLUMN logid SET DEFAULT nextval('public.bookinglogs_logid_seq'::regclass);


--
-- Name: bookingpricing pricingid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookingpricing ALTER COLUMN pricingid SET DEFAULT nextval('public.bookingpricing_pricingid_seq'::regclass);


--
-- Name: bookings bookingid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN bookingid SET DEFAULT nextval('public.bookings_bookingid_seq'::regclass);


--
-- Name: disputes disputeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes ALTER COLUMN disputeid SET DEFAULT nextval('public.disputes_disputeid_seq'::regclass);


--
-- Name: driverratings ratingid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverratings ALTER COLUMN ratingid SET DEFAULT nextval('public.driverratings_ratingid_seq'::regclass);


--
-- Name: locations locationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN locationid SET DEFAULT nextval('public.locations_locationid_seq'::regclass);


--
-- Name: paymentlogs logid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymentlogs ALTER COLUMN logid SET DEFAULT nextval('public.paymentlogs_logid_seq'::regclass);


--
-- Name: paymentmethods methodid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymentmethods ALTER COLUMN methodid SET DEFAULT nextval('public.paymentmethods_methodid_seq'::regclass);


--
-- Name: payments paymentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN paymentid SET DEFAULT nextval('public.payments_paymentid_seq'::regclass);


--
-- Name: promocodes promoid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promocodes ALTER COLUMN promoid SET DEFAULT nextval('public.promocodes_promoid_seq'::regclass);


--
-- Name: ridelogs logid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ridelogs ALTER COLUMN logid SET DEFAULT nextval('public.ridelogs_logid_seq'::regclass);


--
-- Name: riderequests requestid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riderequests ALTER COLUMN requestid SET DEFAULT nextval('public.riderequests_requestid_seq'::regclass);


--
-- Name: rides rideid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides ALTER COLUMN rideid SET DEFAULT nextval('public.rides_rideid_seq'::regclass);


--
-- Name: ridezones zoneid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ridezones ALTER COLUMN zoneid SET DEFAULT nextval('public.ridezones_zoneid_seq'::regclass);


--
-- Name: surgepricing surgeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.surgepricing ALTER COLUMN surgeid SET DEFAULT nextval('public.surgepricing_surgeid_seq'::regclass);


--
-- Name: userpromos userpromoid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userpromos ALTER COLUMN userpromoid SET DEFAULT nextval('public.userpromos_userpromoid_seq'::regclass);


--
-- Name: userroles roleid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userroles ALTER COLUMN roleid SET DEFAULT nextval('public.userroles_roleid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Name: userverification verificationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userverification ALTER COLUMN verificationid SET DEFAULT nextval('public.userverification_verificationid_seq'::regclass);


--
-- Name: vehicleinsurance insuranceid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicleinsurance ALTER COLUMN insuranceid SET DEFAULT nextval('public.vehicleinsurance_insuranceid_seq'::regclass);


--
-- Name: vehicles vehicleid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles ALTER COLUMN vehicleid SET DEFAULT nextval('public.vehicles_vehicleid_seq'::regclass);


--
-- Name: vehicletypes typeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicletypes ALTER COLUMN typeid SET DEFAULT nextval('public.vehicletypes_typeid_seq'::regclass);


--
-- Data for Name: adminactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adminactions (actionid, adminid, targetuserid, actiontype, createdat) FROM stdin;
1	3	2	Suspended Driver for 7 days	2025-03-13 23:06:04.364955
2	3	4	Banned user for repeated cancellations	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: analytics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analytics (analyticsid, metricname, value, "timestamp") FROM stdin;
1	Total Rides Completed	2500.000000	2025-03-13 23:06:04.364955
2	Average Fare per Ride	130.750000	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: bookinglogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookinglogs (logid, bookingid, event, "timestamp") FROM stdin;
1	1	Booking confirmed for 5PM	2025-03-13 23:06:04.364955
2	2	Booking canceled by user	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: bookingpricing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookingpricing (pricingid, bookingid, basefare, surgemultiplier) FROM stdin;
1	1	100.00	1.20
2	2	150.00	1.50
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (bookingid, clientid, vehicleid, status, scheduledtime, createdat) FROM stdin;
1	1	2	Scheduled	2025-03-14 01:06:04.364955	2025-03-13 23:06:04.364955
2	4	3	Completed	2025-03-12 23:06:04.364955	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: disputes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disputes (disputeid, rideid, userid, issue, status, resolution, createdat) FROM stdin;
1	1	1	Driver was late	Resolved	Driver warned	2025-03-13 23:06:04.364955
2	2	4	Overcharged fare	Open	\N	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: driverprofiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.driverprofiles (driverid, licensenumber, experience, backgroundcheckstatus) FROM stdin;
2	DL-12345678	5	t
5	DL-98765432	3	t
\.


--
-- Data for Name: driverratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.driverratings (ratingid, driverid, clientid, stars, review, createdat) FROM stdin;
1	2	1	5	Excellent ride, very smooth!	2025-03-13 23:06:04.364955
2	5	4	4	Good driver but the car was a bit messy.	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (locationid, name, latitude, longitude) FROM stdin;
1	MG Road, Bangalore	12.971600	77.594600
2	Electronic City, Bangalore	12.839200	77.677300
3	Connaught Place, Delhi	28.631500	77.216700
4	DLF Cyber City, Gurgaon	28.504300	77.091300
\.


--
-- Data for Name: paymentlogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paymentlogs (logid, paymentid, event, "timestamp") FROM stdin;
1	1	Payment of ₹144 successful via Visa	2025-03-13 23:06:04.364955
2	2	Payment pending via Google Pay	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: paymentmethods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paymentmethods (methodid, methodname, provider) FROM stdin;
1	Credit Card	Visa
2	Debit Card	MasterCard
3	UPI	Google Pay
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (paymentid, rideid, amount, paymentmethod, status, createdat) FROM stdin;
1	1	144.00	1	Completed	2025-03-13 23:06:04.364955
2	2	270.00	3	Pending	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: promocodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promocodes (promoid, code, discounttype, discountvalue, expirydate, usagelimit) FROM stdin;
1	NEWUSER50	Percentage	50.00	2025-12-31	100
2	SUMMER20	Flat	20.00	2024-09-30	50
\.


--
-- Data for Name: ridelogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ridelogs (logid, rideid, event, "timestamp") FROM stdin;
1	1	Ride started at MG Road	2025-03-13 23:06:04.364955
2	1	Ride completed at Electronic City	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: riderequests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riderequests (requestid, clientid, startlocation, endlocation, preferredvehicletype, status, createdat) FROM stdin;
1	1	MG Road, Bangalore	Electronic City, Bangalore	2	Accepted	2025-03-13 23:06:04.364955
2	4	Connaught Place, Delhi	DLF Cyber City, Gurgaon	3	Pending	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: rides; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rides (rideid, clientid, driverid, vehicleid, startlocation, endlocation, status, fare, surgemultiplier, createdat) FROM stdin;
1	1	2	2	MG Road, Bangalore	Electronic City, Bangalore	Completed	120.00	1.20	2025-03-13 23:06:04.364955
2	4	5	3	Connaught Place, Delhi	DLF Cyber City, Gurgaon	Ongoing	180.00	1.50	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: ridezones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ridezones (zoneid, name, boundaries, demandlevel) FROM stdin;
1	City Center	Polygon data...	5
2	Airport Zone	Polygon data...	4
\.


--
-- Data for Name: surgepricing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.surgepricing (surgeid, zone, timeslot, multiplier) FROM stdin;
1	City Center	6PM - 9PM	1.50
2	Airport	7AM - 10AM	2.00
\.


--
-- Data for Name: userpromos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userpromos (userpromoid, userid, promoid, usedat) FROM stdin;
1	1	1	2025-03-13 23:06:04.364955
2	4	2	\N
\.


--
-- Data for Name: userroles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userroles (roleid, rolename) FROM stdin;
1	Client
2	Driver
3	Admin
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, name, phonenumber, email, roleid, rating, createdat) FROM stdin;
1	Alice Johnson	9876543210	alice@example.com	1	5.00	2025-03-13 23:06:04.364955
2	Bob Smith	8765432109	bob@example.com	2	5.00	2025-03-13 23:06:04.364955
3	Charlie Admin	7654321098	charlie@example.com	3	5.00	2025-03-13 23:06:04.364955
4	David Walker	6543210987	david@example.com	1	5.00	2025-03-13 23:06:04.364955
5	Eve Driver	5432109876	eve@example.com	2	5.00	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: userverification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userverification (verificationid, userid, otp, expiry, verifiedat) FROM stdin;
1	1	123456	2025-03-13 23:16:04.364955	2025-03-13 23:06:04.364955
2	2	654321	2025-03-13 23:11:04.364955	2025-03-13 23:06:04.364955
3	3	789012	2025-03-13 23:21:04.364955	\N
4	4	234567	2025-03-13 23:13:04.364955	2025-03-13 23:06:04.364955
5	5	876543	2025-03-13 23:16:04.364955	\N
\.


--
-- Data for Name: vehicleinsurance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicleinsurance (insuranceid, vehicleid, provider, policynumber, expirydate) FROM stdin;
1	1	LIC	INS123456	2026-06-15
2	2	HDFC Ergo	INS789012	2025-09-20
3	3	Bajaj Allianz	INS345678	2027-01-10
4	4	ICICI Lombard	INS987654	2024-12-31
\.


--
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicles (vehicleid, ownerid, typeid, model, registrationnumber, status, createdat) FROM stdin;
1	2	1	Yamaha R15	KA-01-AA-1234	Available	2025-03-13 23:06:04.364955
2	5	2	Toyota Corolla	MH-12-XY-5678	Booked	2025-03-13 23:06:04.364955
3	2	3	Hyundai Creta	DL-05-ZX-9999	Available	2025-03-13 23:06:04.364955
4	5	4	Tata Ace	RJ-19-QW-4567	Inactive	2025-03-13 23:06:04.364955
\.


--
-- Data for Name: vehicletypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicletypes (typeid, typename, capacity, basefare) FROM stdin;
1	Bike	2	50.00
2	Sedan	4	100.00
3	SUV	6	150.00
4	Truck	2	200.00
\.


--
-- Name: adminactions_actionid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adminactions_actionid_seq', 2, true);


--
-- Name: analytics_analyticsid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.analytics_analyticsid_seq', 2, true);


--
-- Name: bookinglogs_logid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookinglogs_logid_seq', 2, true);


--
-- Name: bookingpricing_pricingid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookingpricing_pricingid_seq', 2, true);


--
-- Name: bookings_bookingid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_bookingid_seq', 2, true);


--
-- Name: disputes_disputeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disputes_disputeid_seq', 2, true);


--
-- Name: driverratings_ratingid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.driverratings_ratingid_seq', 2, true);


--
-- Name: locations_locationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_locationid_seq', 4, true);


--
-- Name: paymentlogs_logid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paymentlogs_logid_seq', 2, true);


--
-- Name: paymentmethods_methodid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paymentmethods_methodid_seq', 3, true);


--
-- Name: payments_paymentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_paymentid_seq', 2, true);


--
-- Name: promocodes_promoid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promocodes_promoid_seq', 2, true);


--
-- Name: ridelogs_logid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ridelogs_logid_seq', 2, true);


--
-- Name: riderequests_requestid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.riderequests_requestid_seq', 2, true);


--
-- Name: rides_rideid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rides_rideid_seq', 2, true);


--
-- Name: ridezones_zoneid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ridezones_zoneid_seq', 2, true);


--
-- Name: surgepricing_surgeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.surgepricing_surgeid_seq', 2, true);


--
-- Name: userpromos_userpromoid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userpromos_userpromoid_seq', 2, true);


--
-- Name: userroles_roleid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userroles_roleid_seq', 3, true);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 5, true);


--
-- Name: userverification_verificationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userverification_verificationid_seq', 5, true);


--
-- Name: vehicleinsurance_insuranceid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicleinsurance_insuranceid_seq', 4, true);


--
-- Name: vehicles_vehicleid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicles_vehicleid_seq', 4, true);


--
-- Name: vehicletypes_typeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicletypes_typeid_seq', 4, true);


--
-- Name: adminactions adminactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adminactions
    ADD CONSTRAINT adminactions_pkey PRIMARY KEY (actionid);


--
-- Name: analytics analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics
    ADD CONSTRAINT analytics_pkey PRIMARY KEY (analyticsid);


--
-- Name: bookinglogs bookinglogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookinglogs
    ADD CONSTRAINT bookinglogs_pkey PRIMARY KEY (logid);


--
-- Name: bookingpricing bookingpricing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookingpricing
    ADD CONSTRAINT bookingpricing_pkey PRIMARY KEY (pricingid);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (bookingid);


--
-- Name: disputes disputes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes
    ADD CONSTRAINT disputes_pkey PRIMARY KEY (disputeid);


--
-- Name: driverprofiles driverprofiles_licensenumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverprofiles
    ADD CONSTRAINT driverprofiles_licensenumber_key UNIQUE (licensenumber);


--
-- Name: driverprofiles driverprofiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverprofiles
    ADD CONSTRAINT driverprofiles_pkey PRIMARY KEY (driverid);


--
-- Name: driverratings driverratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverratings
    ADD CONSTRAINT driverratings_pkey PRIMARY KEY (ratingid);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (locationid);


--
-- Name: paymentlogs paymentlogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymentlogs
    ADD CONSTRAINT paymentlogs_pkey PRIMARY KEY (logid);


--
-- Name: paymentmethods paymentmethods_methodname_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymentmethods
    ADD CONSTRAINT paymentmethods_methodname_key UNIQUE (methodname);


--
-- Name: paymentmethods paymentmethods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymentmethods
    ADD CONSTRAINT paymentmethods_pkey PRIMARY KEY (methodid);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (paymentid);


--
-- Name: promocodes promocodes_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promocodes
    ADD CONSTRAINT promocodes_code_key UNIQUE (code);


--
-- Name: promocodes promocodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promocodes
    ADD CONSTRAINT promocodes_pkey PRIMARY KEY (promoid);


--
-- Name: ridelogs ridelogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ridelogs
    ADD CONSTRAINT ridelogs_pkey PRIMARY KEY (logid);


--
-- Name: riderequests riderequests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riderequests
    ADD CONSTRAINT riderequests_pkey PRIMARY KEY (requestid);


--
-- Name: rides rides_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides
    ADD CONSTRAINT rides_pkey PRIMARY KEY (rideid);


--
-- Name: ridezones ridezones_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ridezones
    ADD CONSTRAINT ridezones_name_key UNIQUE (name);


--
-- Name: ridezones ridezones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ridezones
    ADD CONSTRAINT ridezones_pkey PRIMARY KEY (zoneid);


--
-- Name: surgepricing surgepricing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.surgepricing
    ADD CONSTRAINT surgepricing_pkey PRIMARY KEY (surgeid);


--
-- Name: userpromos userpromos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userpromos
    ADD CONSTRAINT userpromos_pkey PRIMARY KEY (userpromoid);


--
-- Name: userroles userroles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userroles
    ADD CONSTRAINT userroles_pkey PRIMARY KEY (roleid);


--
-- Name: userroles userroles_rolename_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userroles
    ADD CONSTRAINT userroles_rolename_key UNIQUE (rolename);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phonenumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phonenumber_key UNIQUE (phonenumber);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: userverification userverification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userverification
    ADD CONSTRAINT userverification_pkey PRIMARY KEY (verificationid);


--
-- Name: vehicleinsurance vehicleinsurance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicleinsurance
    ADD CONSTRAINT vehicleinsurance_pkey PRIMARY KEY (insuranceid);


--
-- Name: vehicleinsurance vehicleinsurance_policynumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicleinsurance
    ADD CONSTRAINT vehicleinsurance_policynumber_key UNIQUE (policynumber);


--
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (vehicleid);


--
-- Name: vehicles vehicles_registrationnumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_registrationnumber_key UNIQUE (registrationnumber);


--
-- Name: vehicletypes vehicletypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicletypes
    ADD CONSTRAINT vehicletypes_pkey PRIMARY KEY (typeid);


--
-- Name: vehicletypes vehicletypes_typename_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicletypes
    ADD CONSTRAINT vehicletypes_typename_key UNIQUE (typename);


--
-- Name: adminactions adminactions_adminid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adminactions
    ADD CONSTRAINT adminactions_adminid_fkey FOREIGN KEY (adminid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: adminactions adminactions_targetuserid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adminactions
    ADD CONSTRAINT adminactions_targetuserid_fkey FOREIGN KEY (targetuserid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: bookinglogs bookinglogs_bookingid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookinglogs
    ADD CONSTRAINT bookinglogs_bookingid_fkey FOREIGN KEY (bookingid) REFERENCES public.bookings(bookingid) ON DELETE CASCADE;


--
-- Name: bookingpricing bookingpricing_bookingid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookingpricing
    ADD CONSTRAINT bookingpricing_bookingid_fkey FOREIGN KEY (bookingid) REFERENCES public.bookings(bookingid) ON DELETE CASCADE;


--
-- Name: bookings bookings_clientid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_clientid_fkey FOREIGN KEY (clientid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: bookings bookings_vehicleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_vehicleid_fkey FOREIGN KEY (vehicleid) REFERENCES public.vehicles(vehicleid) ON DELETE CASCADE;


--
-- Name: disputes disputes_rideid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes
    ADD CONSTRAINT disputes_rideid_fkey FOREIGN KEY (rideid) REFERENCES public.rides(rideid) ON DELETE CASCADE;


--
-- Name: disputes disputes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disputes
    ADD CONSTRAINT disputes_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: driverprofiles driverprofiles_driverid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverprofiles
    ADD CONSTRAINT driverprofiles_driverid_fkey FOREIGN KEY (driverid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: driverratings driverratings_clientid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverratings
    ADD CONSTRAINT driverratings_clientid_fkey FOREIGN KEY (clientid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: driverratings driverratings_driverid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driverratings
    ADD CONSTRAINT driverratings_driverid_fkey FOREIGN KEY (driverid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: paymentlogs paymentlogs_paymentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymentlogs
    ADD CONSTRAINT paymentlogs_paymentid_fkey FOREIGN KEY (paymentid) REFERENCES public.payments(paymentid) ON DELETE CASCADE;


--
-- Name: payments payments_paymentmethod_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_paymentmethod_fkey FOREIGN KEY (paymentmethod) REFERENCES public.paymentmethods(methodid) ON DELETE SET NULL;


--
-- Name: payments payments_rideid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_rideid_fkey FOREIGN KEY (rideid) REFERENCES public.rides(rideid) ON DELETE CASCADE;


--
-- Name: ridelogs ridelogs_rideid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ridelogs
    ADD CONSTRAINT ridelogs_rideid_fkey FOREIGN KEY (rideid) REFERENCES public.rides(rideid) ON DELETE CASCADE;


--
-- Name: riderequests riderequests_clientid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riderequests
    ADD CONSTRAINT riderequests_clientid_fkey FOREIGN KEY (clientid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: riderequests riderequests_preferredvehicletype_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riderequests
    ADD CONSTRAINT riderequests_preferredvehicletype_fkey FOREIGN KEY (preferredvehicletype) REFERENCES public.vehicletypes(typeid) ON DELETE SET NULL;


--
-- Name: rides rides_clientid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides
    ADD CONSTRAINT rides_clientid_fkey FOREIGN KEY (clientid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: rides rides_driverid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides
    ADD CONSTRAINT rides_driverid_fkey FOREIGN KEY (driverid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: rides rides_vehicleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rides
    ADD CONSTRAINT rides_vehicleid_fkey FOREIGN KEY (vehicleid) REFERENCES public.vehicles(vehicleid) ON DELETE SET NULL;


--
-- Name: userpromos userpromos_promoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userpromos
    ADD CONSTRAINT userpromos_promoid_fkey FOREIGN KEY (promoid) REFERENCES public.promocodes(promoid) ON DELETE CASCADE;


--
-- Name: userpromos userpromos_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userpromos
    ADD CONSTRAINT userpromos_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: users users_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.userroles(roleid) ON DELETE CASCADE;


--
-- Name: userverification userverification_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userverification
    ADD CONSTRAINT userverification_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: vehicleinsurance vehicleinsurance_vehicleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicleinsurance
    ADD CONSTRAINT vehicleinsurance_vehicleid_fkey FOREIGN KEY (vehicleid) REFERENCES public.vehicles(vehicleid) ON DELETE CASCADE;


--
-- Name: vehicles vehicles_ownerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: vehicles vehicles_typeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_typeid_fkey FOREIGN KEY (typeid) REFERENCES public.vehicletypes(typeid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

