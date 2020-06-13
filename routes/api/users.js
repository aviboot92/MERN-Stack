const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

//  @route Post api/users @desc Test router @access PUBLIC
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid eamil').isEmail(),
    check('password', 'Password is required and must be atleast 8 characters long').isLength({min: 8})
], (req, res) => {
    console.log(req.body.name);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array()
            });
    }
    res.send('User route');
});

module.exports = router;