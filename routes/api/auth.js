const express = require('express');
const router =  express.Router();

//  @route GET api/Auths
// @desc Test router
// @access PUBLIC
router.get('/', (req,res) => res.send('Auth route'));

module.exports = router;