const express = require('express');
const router = express.Router();
const promotorController = require('../../controller/v1/promotor');
const check = require('../../utils/checkRole');
const passport = require('passport');

//      @type       POST
//      @route      /api/v1/promotor/profile/create
//      @desc       FOR CREATING PROMOTOR PROFILE
//      @access     PRIVATE
router.post(
  '/profile/create',
  passport.authenticate('jwt', { session: false }),
  promotorController.createProfile
);

//      @type       GET
//      @route      /api/v1/promotor/profile/:userId
//      @desc       FOR FERTCHING PROMOTOR PROFILE
//      @access     PRIVATE
router.post(
  '/profile/:userId',
  passport.authenticate('jwt', { session: false }),
  promotorController.fetchProfile
);

module.exports = router;
//testing................
