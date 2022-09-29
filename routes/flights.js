"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Flight = require("../models/flight");


const router = new express.Router();
// const router = express.Router({ mergeParams: true });

router.post("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const flight_info = await Flight.create(req.body);
      return res.status(201).json({ flight_info });
    } catch (err) {
      return next(err);
    }
  });
  
  router.get("/", async function (req, res, next) {
    const query = req.query;
    try {
      const flights = await Flight.findAll(query);
      return res.json({ flights });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:id", async function (req, res, next) {
    try {
      const flight = await Flight.get(req.params.id);
      return res.json({ flight });
    } catch (err) {
      return next(err);
    }
  });

  router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const flight = await Flight.update(req.params.id, req.body);
      return res.json({ flight });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await Flight.remove(req.params.id);
      return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });  
  
  module.exports = router;