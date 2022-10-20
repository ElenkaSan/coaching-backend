"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Hotel {
  /** Create a hotel (from data), update db, return new hotel data.
   **/

  static async create(data) {
    const result = await db.query(
      `INSERT INTO hotelReservations AS "hotel_info"(hotelName,
                                          roomType,
                                          checkInDate,
                                          checkOutDate,
                                          numberOfGuests,
                                          roomsNumber,
                                          price,
                                          currency)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING
           id, 
           hotelName,
           roomType,
           checkInDate,
           checkOutDate,
           numberOfGuests,
           roomsNumber,
           price,
           currency`,
        [
          data.hotelName,
          data.roomType,
          data.checkInDate,
          data.checkOutDate,
          data.numberOfGuests,
          data.roomsNumber,
          data.price,
          data.currency
        ]);
    let hotel = result.rows[0];
    return hotel;
  }

  /** Find all hotels (optional filter on searchFilters).
   *
   * searchFilters (all optional):
              id, 
             hotelName,
             roomType,
             checkInDate,
             checkOutDate,
             numberOfGuests,
             roomsNumber,
             price,
             currency
   * */

  static async findAll({ hotelName, checkInDate, checkOutDate, price } = {}) {
    let query = `SELECT h.id,
                        h.hotelName,
                        h.checkInDate,
                        h.checkOutDate, 
                        h.price
                 FROM hotelReservations h`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (hotelName !== undefined) {
        queryValues.push(`%${hotelName}%`);
        whereExpressions.push(`hotelName ILIKE $${queryValues.length}`);
      }

    if (price !== undefined) {
      queryValues.push(price);
      whereExpressions.push(`price >= $${queryValues.length}`);
    }

    if (checkInDate !== undefined) {
        queryValues.push(`%${checkInDate}%`);
        whereExpressions.push(`checkin ILIKE $${queryValues.length}`);
      }

    if (checkOutDate !== undefined) {
      queryValues.push(`%${checkOutDate}%`);
      whereExpressions.push(`checkout ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY price";
    const hotelsRes = await db.query(query, queryValues);
    return hotelsRes.rows;
  }

  /** Given a hotel id, return data about hotel.
   *
   * Returns { id, 
             hotelName,
             roomType,
             checkInDate,
             checkOutDate,
             numberOfGuests,
             roomsNumber,
             price,
             currency }
   *   where company is {id, 
             hotelName,
             roomType,
             checkInDate,
             checkOutDate,
             numberOfGuests,
             roomsNumber,
             price,
             currency }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const hotelsRes = await db.query(
     `SELECT id, 
             hotelName,
             roomType,
             checkInDate,
             checkOutDate,
             numberOfGuests,
             roomsNumber,
             price,
             currency
      FROM hotelReservations
      WHERE id = $1`, [id]);

    const hotel = hotelsRes.rows[0];
    if (!hotel) throw new NotFoundError(`No found hotel: ${id}`);
    return hotel;
  }

  /** Update hotel data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { id, 
             hotelName,
             roomType,
             checkInDate,
             checkOutDate,
             numberOfGuests,
             roomsNumber,
             price,
             currency }
   *
   * Returns {id, 
             hotelName,
             roomType,
             checkInDate,
             checkOutDate,
             numberOfGuests,
             roomsNumber,
             price,
             currency }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE hotelReservations
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING 
                      id, 
                      hotelName,
                      roomType,
                      checkInDate,
                      checkOutDate,
                      numberOfGuests,
                      roomsNumber,
                      price,
                      currency`;
    const result = await db.query(querySql, [...values, id]);
    const hotel = result.rows[0];

    if (!hotel) throw new NotFoundError(`No found hotel: ${id}`);
    return hotel;
  }

//    Delete given hotels from database; returns undefined.
  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM hotelReservations
           WHERE id = $1
           RETURNING id`, [id]);

    const hotel = result.rows[0];
    if (!hotel) throw new NotFoundError(`No found hotel: ${id}`);
  }

}

module.exports = Hotel;
