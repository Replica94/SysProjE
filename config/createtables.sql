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

DROP TABLE IF EXISTS auth_token;
CREATE TABLE auth_token
(
  id serial NOT NULL,
  userid serial NOT NULL,
  selector character varying(12) NOT NULL,
  token character varying(64) NOT NULL,
  expires timestamp without time zone NOT NULL,
  CONSTRAINT auth_token_pkey PRIMARY KEY (id),
  CONSTRAINT auth_token_userid_fkey FOREIGN KEY (userid)
      REFERENCES account (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS score;
CREATE TABLE score
(
  id serial NOT NULL,
  accountid serial NOT NULL,
  difficulty integer NOT NULL,
  score integer NOT NULL,
  added timestamp without time zone NOT NULL,
  CONSTRAINT score_pkey PRIMARY KEY (id),
  CONSTRAINT score_account_fkey FOREIGN KEY (accountid)
      REFERENCES account (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
