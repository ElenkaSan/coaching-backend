"use strict";

const db = require("../db.js");
const User = require("../models/user");
// const Hotel = require("../models/hotel");
// const Flight = require("../models/flight");

const { createToken } = require("../helpers/tokens");

// const testFlightIds = [];
// const testHotelIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  // await db.query("DELETE FROM hotelReservations");
  // await db.query("DELETE FROM flightReservations");

  // await Flight.create(
  //     {
  //       numberOfPassengers: 1,
  //       locationD: "JFK",
  //       locationA: "MIA",
  //       dateD: "11/11/2022",
  //       dateA: "11/15/2025",
  //       price: 130,
  //       currency: "EUR",
  //     });
  // await Flight.create(
  //     {
  //       numberOfPassengers: 2,
  //       locationD: "MIA", 
  //       locationA: "JFK",
  //       dateD: "12/11/2022",
  //       dateA: "12/25/2022",
  //       price: 140,
  //       currency: "EUR",
  //     });

  //     testFlightIds[1] = (await Flight.create(
  //       { numberOfPassengers: 1, locationD: "JFK", locationA: "MIA", dateD: "11/11/2022",
  //       dateA: "11/15/2025" })).id;

  // await Hotel.create(
  //     {
  //      hotelName: "MIA",
  //      roomType: "c",
  //      checkInDate: "11/11/2025",
  //      checkOutDate: "11/15/2025",
  //      numberOfGuests: 1,  
  //      roomsNumber: 1,
  //      price: 130,
  //      currency: "EUR",
  //     });
  // await Hotel.create(
  //       {
  //         hotelName: "NYC",
  //         roomType: "c",
  //         checkInDate: "12/11/2025",
  //         checkOutDate: "12/15/2025",
  //         numberOfGuests: 2,  
  //         roomsNumber: 1,
  //         price: 140,
  //         currency: "EUR",
  //       });

  //       testHotelIds[1] = (await Hotel.create(
  //         { hotelName: "NYC", checkInDate: "12/11/2025", checkOutDate: "12/15/2025" })).id;

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

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


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  // testFlightIds,
  // testHotelIds,
  u1Token,
  u2Token,
  adminToken,
};
