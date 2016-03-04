DROP TABLE IF EXISTS account;
CREATE TABLE account
(
  id serial NOT NULL,
  username character varying(20),
  pwhash character varying(255),
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT account_username_key UNIQUE (username)
)
WITH (
  OIDS=FALSE
);

