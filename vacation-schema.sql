CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  notes TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE flightReservations (
  id SERIAL PRIMARY KEY,
  numberOfPassengers NUMERIC NOT NULL,  
  location_departure TEXT NOT NULL,
  location_arrival TEXT NOT NULL,
  departureDate DATE NOT NULL,
  returnDate DATE NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT
);

CREATE TABLE hotelReservations (
  id SERIAL PRIMARY KEY,
  hotelName TEXT NOT NULL,
  roomType TEXT NOT NULL,
  checkInDate DATE NOT NULL,
  checkOutDate DATE NOT NULL,
  numberOfGuests NUMERIC,  
  roomsNumber NUMERIC,
  price INTEGER NOT NULL,
  currency TEXT
);


CREATE TABLE trips (
  id SERIAL,
  -- trip_name TEXT NOT NULL,
  -- trip_date DATE NOT NULL,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  flightReservation_id INTEGER
    REFERENCES flightReservations ON DELETE CASCADE,
  hotelReservation_id INTEGER
    REFERENCES hotelReservations ON DELETE CASCADE,
    PRIMARY KEY (id, username, flightReservation_id, hotelReservation_id)
);

-- create savetrip -- conect many to many each user connect to save trip
