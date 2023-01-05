\echo 'Delete and recreate coach db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- psql < coach.sql then node server.js

DROP DATABASE coach;
CREATE DATABASE coach;
\connect coach

\i coach-schema.sql


-- \echo 'Delete and recreate coach_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE coach_test;
-- CREATE DATABASE coach_test;
-- \i coach-test-seed.sql
-- \connect coach_test

-- \i coach-schema.sql
