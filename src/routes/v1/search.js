const express = require('express');
const router = express.Router();
const check = require('../../utils/checkRole');
const passport = require('passport');
const searchController = require('../../controller/v1/search');

//      @type       GET
//      @route      /api/v1/search/:data
//      @desc       SEARCH AMONG ALL USERS BY NAME
//      @access     PUBLIC
router.get('/users/:data', searchController.searchUsers);

module.exports = router;
