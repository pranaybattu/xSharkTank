const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// const { stringify } = require("nodemon/lib/utils");
var Float = require('mongoose-float').loadType(mongoose);

const OffersSchema = mongoose.Schema({
        id:{
            type: String,
            require: false
        },
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
        date: {
            type: String,
            default: Date.now
        },
        pitch: {
            type: ObjectId,
            ref: 'Pitches'
        }
    },
    { timestamp: true }
);
// OffersSchema.methods.toBackbone = function () {
//     var obj = this.toObject();
//     obj.id = obj._id;
//     delete obj._id;
//     return obj;
// OffersSchema.virtual('id').get(function(){
//     return this._id;
// });

// // Ensure virtual fields are serialised.
// OffersSchema.set('toJSON', {
//     virtuals: true
// });
OffersSchema.pre('save', function (next) {
    this.id = this._id;
    next()
})
module.exports = mongoose.model("Offers", OffersSchema);