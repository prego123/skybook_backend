const express = require('express');
const router = express.Router();
const authController = require('../../controller/v1/auth');
const check = require('../../utils/checkRole');
const passport = require('passport');
const upload = require('../../middleware/upload')
//      @type       GET
//      @route      /api/v1/auth/signin
//      @desc       FOR LOGIN
//      @access     PUBLIC
router.get('/signin/:id/:password', authController.signIn);

//      @type       POST
//      @route      /api/v1/auth/signup
//      @desc       FOR NEW REGISTER
//      @access     PUBLIC
router.post('/signup', upload.single('picture') ,authController.signUp);

module.exports = router;
