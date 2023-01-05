CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- CREATE TABLE classes (
--   id SERIAL,
--   username VARCHAR(25)
--     REFERENCES users ON DELETE CASCADE,
--   program_id INTEGER
--     REFERENCES programs ON DELETE CASCADE,
--   publication_id INTEGER
--     REFERENCES publications ON DELETE CASCADE,
--     PRIMARY KEY (id, username, program_id, publication_id)
-- );

-- CREATE TABLE programs (
--   id SERIAL PRIMARY KEY,
--   programName TEXT NOT NULL,
--   dates DATE NOT NULL,
--   price INTEGER NOT NULL,
-- );

-- CREATE TABLE publications (
--   id SERIAL PRIMARY KEY,
--   PublicationName TEXT NOT NULL,
--   dates DATE NOT NULL,
--   notes TEXT
-- );
