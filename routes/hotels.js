"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Hotel = require("../models/hotel");


const router = new express.Router();
// const router = express.Router({ mergeParams: true });

router.post("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const hotel = await Hotel.create(req.body);
      return res.status(201).json({ hotel });
    } catch (err) {
      return next(err);
    }
  });
  

  router.get("/", async function (req, res, next) {
    const query = req.query;
    try {
      const hotels = await Hotel.findAll(query);
      return res.json({ hotels });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:id", async function (req, res, next) {
    try {
      const hotel = await Hotel.get(req.params.id);
      return res.json({ hotel });
    } catch (err) {
      return next(err);
    }
  });

  router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const hotel = await Hotel.update(req.params.id, req.body);
      return res.json({ hotel });
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await Hotel.remove(req.params.id);
      return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });  
  
  module.exports = router;