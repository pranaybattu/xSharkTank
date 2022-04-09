const express = require("express");
const router = express.Router();
const {getAllPitches, createNewPitch, getRequiredPitch, postOfferToPitch} = require("../controllers/pitchesApiController");
const { runValidation } = require('../validators')
const { pitchValidator } = require("../validators/pitchValidator");
const { offerValidator } = require("../validators/offerValidator");


// @route         POST /pitches
// @desc          post a pitch
// @access        Public

router.post("/", pitchValidator, runValidation, createNewPitch);

// @route         POST /pitches:id/makeOffer
// @desc          post an offer
// @access        Public

router.post("/:id/makeOffer", offerValidator, runValidation, postOfferToPitch);

// @route         GET /pitches
// @desc          Get all the pitches in the reverse chronological order
// @access        Public

router.get("/", getAllPitches);

// @route         GET /pitches:id
// @desc          fetch a single Pitch
// @access        Public
router.get("/:id", getRequiredPitch);


module.exports = router;

