// "use strict";

// const db = require("../db");
// const { NotFoundError} = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");


// class Trip {
//   /** Create a trip (from data), update db, return new trip data.
//    **/

//   static async create(data) {
//     const result = await db.query(
//           `INSERT INTO trips (username,
//                               flightReservation_id,
//                               hotelReservation_id)
//            VALUES ($1, $2, $3)
//            RETURNING
//                     id,
//                     username,
//                     flightReservation_id AS "flightId",
//                     hotelReservation_id AS "hotelId"`,
//         [
//           data.username,
//           data.flightId,
//           data.hotelId,
//         ]);
//     let trip = result.rows[0];

//     return trip;
//   }

//   /** Find all trips (optional filter on searchFilters).
//    *
//    * searchFilters (all optional):
//                         t.id,
//                         t.username,
//                         t.flightReservation_id AS "flightId",
//                         t.hotelReservation_id AS "hotelId"
//    * */

//   static async findAll({ username, flightId, hotelId } = {}) {
//     let query = `SELECT t.id,
//                         t.username,
//                         t.flightReservation_id AS "flightId",
//                         t.hotelReservation_id AS "hotelId"
//                  FROM trips t`;
//     let whereExpressions = [];
//     let queryValues = [];

//     // For each possible search term, add to whereExpressions and
//     // queryValues so we can generate the right SQL

//     if (username !== undefined) {
//         queryValues.push(`%${username}%`);
//         whereExpressions.push(`username ILIKE $${queryValues.length}`);
//       }

//     if (flightId !== undefined) {
//         queryValues.push(`%${flightId}%`);
//         whereExpressions.push(`flightId ILIKE $${queryValues.length}`);
//       }

//     if (hotelId !== undefined) {
//       queryValues.push(`%${hotelId}%`);
//       whereExpressions.push(`hotelId ILIKE $${queryValues.length}`);
//     }

//     if (whereExpressions.length > 0) {
//       query += " WHERE " + whereExpressions.join(" AND ");
//     }

//     // Finalize query and return results

//     query += " ORDER BY tripName";
//     const tripsRes = await db.query(query, queryValues);
//     return tripsRes.rows;
//   }

// }

// module.exports = Trip;
