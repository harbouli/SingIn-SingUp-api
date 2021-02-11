const {check} = require('express-validator')
exports.userSingupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Must be a Valid email'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 caracters'),
]
exports.userSinginValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 caracters'),
]