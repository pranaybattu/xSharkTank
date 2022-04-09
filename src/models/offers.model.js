const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// const { stringify } = require("nodemon/lib/utils");
var Float = require('mongoose-float').loadType(mongoose);

const OffersSchema = mongoose.Schema({
        
        investor: {
            type: String,
            required: true
        },
        amount: {
            type: Float,
            required: true
        },
        equity: {
            type: Float,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        pitch: {
            type: ObjectId,
            ref: 'Pitches'
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model("Offers", OffersSchema);