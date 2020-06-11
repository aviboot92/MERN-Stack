const express = require('express');
const router =  express.Router();

//  @route GET api/Posts
// @desc Test router
// @access PUBLIC
router.get('/', (req,res) => res.send('Post route'));

module.exports = router;