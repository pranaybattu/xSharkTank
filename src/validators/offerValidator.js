const { check } = require('express-validator');

exports.offerValidator = [
    check('investor')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Invalid Reqeust Body'),

    check('amount')
        .not()
        .isEmpty()
        .isFloat()
        .withMessage('Invalid Reqeust Body'),

    check('equity')
        .not()
        .isEmpty()
        .isFloat({min: 0, max:100})
        .withMessage('Invalid Reqeust Body'),
    
    check('comment')
        .not()
        .isEmpty()
        .isString()
        .withMessage('Invalid Reqeust Body')
]