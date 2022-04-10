const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
var Float = require('mongoose-float').loadType(mongoose);

const pitchesSchema = new mongoose.Schema({
        id:{
            type: String,
            require: false
        },
        entrepreneur: {
            type: String,
            required: true
        },
        pitchTitle: {
            type: String,
            required: true
        },
        pitchIdea: {
            type: String,
            required: true
        },
        askAmount: {
            type: Float,
            required: true
        },
        equity: {
            type: Float,
            required: true
        },
        date: {
            type: String,
            default: Date.now
        },
        offers: [{ 
            type: ObjectId, 
            ref: 'Offers'
        }]
    },
    { timestamp: true }
);
// pitchesSchema.methods.toBackbone = function () {
//     var obj = this.toObject();
//     obj.id = obj._id;
//     delete obj._id;
//     return obj;
// }
// pitchesSchema.virtual('id').get(function(){
//     return this._id;
// });

// // Ensure virtual fields are serialised.
// pitchesSchema.set('toJSON', {
//     virtuals: true
// });
pitchesSchema.pre('save', function (next) {
    this.id = this._id;
    next()
})

module.exports = mongoose.model("pitches", pitchesSchema);