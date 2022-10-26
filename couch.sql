\echo 'Delete and recreate couch db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- psql < couch.sql then node server.js

DROP DATABASE couch;
CREATE DATABASE couch;
\connect couch

\i couch-schema.sql


-- \echo 'Delete and recreate couch_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE couch_test;
-- CREATE DATABASE couch_test;
-- \i couch-test-seed.sql
-- \connect couch_test

-- \i couch-schema.sql
