"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Flight {
  /** Create a flight (from data), update db, return new flight data.
   *  data should be {id, numberOfPassengers, location_departure, location_arrival, departureDate, returnDate, price, currency }
   *  Returns {id, numberOfPassengers, location_departure, location_arrival, departureDate, returnDate, price, currency }
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO flightReservations (numberOfPassengers,
                                           location_departure,
                                           location_arrival,
                                           departureDate,
                                           returnDate ,
                                           price,
                                           currency)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id, 
                     numberOfPassengers,
                     location_departure AS "locationD",
                     location_arrival AS "locationA",
                     departureDate AS "dateD",
                     returnDate AS "dateA",
                     price,
                     currency`
        [
          data.numberOfPassengers,
          data.locationD,
          data.locationA,
          data.dateD,
          data.dateA,
          data.price,
          data.currency
        ]);
    let flight = result.rows[0];

    return flight;
  }

  /** Find all flights (optional filter on searchFilters).
   *
   * searchFilters (all optional):
                     numberOfPassengers,
                     location_departure AS "locationD",
                     location_arrival AS "locationA",
                     departureDate AS "dateD",
                     price
   * Returns [{ id, numberOfPassengers, locationD, locationA, dateD, price }, ...]
   * */

  static async findAll({ numberOfPassengers, locationA, dateD, locationD, price } = {}) {
    let query = `SELECT f.id,
                        f.numberOfPassengers,
                        f.location_arrival AS "locationA", 
                        f.departureDate AS "dateD",
                        f.location_departure AS "locationD",
                        f.price
                 FROM flightReservations f`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (numberOfPassengers !== undefined) {
        queryValues.push(`%${numberOfPassengers}%`);
        whereExpressions.push(`numberOfPassengers ILIKE $${queryValues.length}`);
      }

    if (locationA !== undefined) {
      queryValues.push(`%${locationA}%`);
      whereExpressions.push(`locationA ILIKE $${queryValues.length}`);
    }

    if (dateD !== undefined) {
        queryValues.push(`%${dateD}%`);
        whereExpressions.push(`dateD ILIKE $${queryValues.length}`);
      }

    if (locationD !== undefined) {
        queryValues.push(`%${locationD}%`);
        whereExpressions.push(`locationD ILIKE $${queryValues.length}`);
      }

    if (price !== undefined) {
        queryValues.push(`%${price}%`);
        whereExpressions.push(`price >= $${queryValues.length}`);
      }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY price";
    const flightsRes = await db.query(query, queryValues);
    return flightsRes.rows;
  }

  /** Given a flight id, return data about flight.
   *
   * Returns {id, numberOfPassengers, location_departure, location_arrival, departureDate, returnDate, price, currency }
   *  
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const flightsRes = await db.query(
             `SELECT id, 
                     numberOfPassengers,
                     location_departure AS "locationD",
                     location_arrival AS "locationA",
                     departureDate AS "dateD",
                     returnDate AS "dateA",
                     price,
                     currency
           FROM flightReservations
           WHERE id = $1`, [id]);

    const flight = flightsRes.rows[0];
    if (!flight) throw new NotFoundError(`No found flight: ${id}`);
    return flight;
  }

  /** Update flight data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: {numberOfPassengers, location_departure, location_arrival, departureDate, returnDate, price, currency }
   *
   * Returns {id, numberOfPassengers, location_departure, location_arrival, departureDate, returnDate, price, currency }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE flightReservations
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                      numberOfPassengers,
                      location_departure AS "locationD",
                      location_arrival AS "locationA",
                      departureDate AS "dateD",
                      returnDate AS "dateA",
                      price,
                      currency`;
    const result = await db.query(querySql, [...values, id]);
    const flight = result.rows[0];

    if (!flight) throw new NotFoundError(`No found flight: ${id}`);
    return flight;
  }

//    Delete given flights from database; returns undefined.
  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM flightReservations
           WHERE id = $1
           RETURNING id`, [id]);

    const flight = result.rows[0];
    if (!flight) throw new NotFoundError(`No found flight: ${id}`);
  }

}

module.exports = Flight;
