const express = require('express');
const router =  express.Router();

//  @route GET api/Profiles
// @desc Test router
// @access PUBLIC
router.get('/', (req,res) => res.send('Profile route'));

module.exports = router;