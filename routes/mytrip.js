"use strict";

const tripNewSchema = require("../schemas/tripNew.json");
const tripUpdateSchema = require("../schemas/tripUpdate.json");
const tripSearchSchema = require("../schemas/tripSearch.json");

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Trip = require("../models/trip");

// const companyNewSchema = require("../schemas/companyNew.json");
// const companyUpdateSchema = require("../schemas/companyUpdate.json");
// const companySearchSchema = require("../schemas/companySearch.json");

const router = new express.Router();


router.post("/", ensureAdmin, async function (req, res, next) {
    try {
    //CREATING and EMPTY TRIP for USER
    const { username, flightReservation_id, hotelReservation_id } = req.body;
    
    const newTrip = await Trip.create({
      username, 
      flightReservation_id,
      hotelReservation_id
     });
   
    // const { dataValues } = newTrip;
    res.send(newTrip);
      // const validator = jsonschema.validate(req.body, tripNewSchema);
      // if (!validator.valid) {
      //   const errs = validator.errors.map(e => e.stack);
      //   throw new BadRequestError(errs);
      // }
      // const trip = await Trip.create(req.body);
      // return res.status(201).json({ trip }); 
      return res.status(201).json({ newTrip });
    } catch (err) {
      return next(err);
    }
  });


  router.get("/", async function (req, res, next) {
    //GET all the TRIPS of the user using USER_ID that is in the token
    // const q = req.query; 
    // arrive as strings from querystring, but we want as int/bool
    // if (q.type !== undefined) q.type = +q.type;
    // q.class_type = q.class_type=== "true";
  
    try {
    //   const validator = jsonschema.validate(q);
      // const validator = jsonschema.validate(q, tripSearchSchema);
      // if (!validator.valid) {
      //   const errs = validator.errors.map(e => e.stack);
      //   throw new BadRequestError(errs);
      // }
      // const trips = await Trip.findAll(q);
       const trips = await Trip.findAll();
        // res.send(trips);
      return res.json({ trips });
    } catch (err) {
      return next(err);
    }
  });


  module.exports = router;