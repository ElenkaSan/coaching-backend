const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testFlightIds = [];
const testHotelIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  // await db.query("DELETE FROM flightReservations");
  // await db.query("DELETE FROM hotelReservations");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  // await db.query(`
  //   INSERT INTO flightReservations (numberOfPassengers,
  //     location_departure,
  //     location_arrival,
  //     departureDate,
  //     returnDate,
  //     price,
  //     currency)
  //   VALUES (1, 'JFK', 'MIA', '11/11/2022', '11/15/2025', 130, 'EUR'),
  //          (2, 'MIA', 'JFK', '12/11/2022', '12/25/2022', 140, 'EUR')`);

  // const resultsFlights = await db.query(`
  //   INSERT INTO flightReservations (numberOfPassengers, 
  //     location_departure, location_arrival, departureDate)
  //   VALUES (3, 'DMN', 'TNJ', '08/22/2023'),
  //          (5, 'TMN', 'TMP', '01/22/2023')
  //   RETURNING id`);
  //   testFlightIds.splice(0, 0, ...resultsFlights.rows.map(r => r.id));

  //   await db.query(`
  //   INSERT INTO hotelReservations (hotelName,
  //     roomType,
  //     checkInDate,
  //     checkOutDate,
  //     numberOfGuests,  
  //     roomsNumber,
  //     price,
  //     currency)
  //   VALUES ('MIA', 'c', '11/11/2025', '11/15/2025', 1, 1, 130, 'EUR'),
  //          ('NYC', 'c', '12/11/2025', '12/15/2025', 2, 1, 140, 'EUR')`);

  // const resultsHotels = await db.query(`
  //   INSERT INTO hotelReservations (hotelName, checkInDate, checkOutDate)
  //   VALUES ('DMN', '08/22/2023', '08/28/2023'),
  //          ('TMN', '01/22/2023', '02/22/2023')
  //   RETURNING id`);
  //   testHotelIds.splice(0, 0, ...resultsHotels.rows.map(r => r.id));

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  // await db.query(`
  //       INSERT INTO trips(username, flightReservations_id, hotelReservations_id)
  //       VALUES ('u1', $1, $2)`,
  //     [testFlightIds[1]], [testHotelIds[1]]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testFlightIds,
  testHotelIds,
};