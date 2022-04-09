const { check } = require('express-validator');
const { notify } = require('../routes/pitches');

exports.pitchValidator = [
    check('entrepreneur')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Invalid Reqeust Body'),
    check('pitchTitle')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Invalid Reqeust Body'),
    check('pitchIdea')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Invalid Reqeust Body'),
    check('askAmount')
        .not()
        .isEmpty()
        .isFloat()
        .withMessage('Invalid Reqeust Body'),
    check('equity')
        .not()
        .isEmpty()
        .isFloat({min: 0, max:100})
        .withMessage('Invalid Reqeust Body')
]