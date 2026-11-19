DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE caravans (
  id serial PRIMARY KEY,
  name text NOT NULL,
  camels integer NOT NULL CHECK (camels IN (2, 3)),
  water integer NOT NULL CHECK (water >= 0),
  salt integer NOT NULL DEFAULT 0 CHECK (salt >= 0),
  gold integer NOT NULL CHECK (gold >= 0),
  has_guide boolean NOT NULL
);
