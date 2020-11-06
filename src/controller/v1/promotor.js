const Promotor = require('../../model/v1/promotors');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.createProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      profession,
      location,
      status,
      from,
      nickname,
      memberOf,
      workAt,
      achievements,
      workingFor,
      interestedIn,
      protoming,
      inspiredBy,
      passion,
      aspirantOf,
      learning,
      belongTo,
      committedTo,
      believein,
      haterOf,
      hobby,
      like,
      joined,
      link,
    } = req.body;

    console.log(req);

    if (!location) {
      return res.json({
        error: true,
        message: 'Location is required',
      });
    }

    const profileCreate = new Promotor({
      userId: _id,
      profession,
      location,
      status,
      from,
      nickname,
      memberOf,
      workAt,
      achievements,
      workingFor,
      interestedIn,
      protoming,
      inspiredBy,
      passion,
      aspirantOf,
      learning,
      belongTo,
      committedTo,
      believein,
      haterOf,
      hobby,
      like,
      joined,
      link,
    }).save();

    if (!profileCreate) {
      return res.json({
        error: true,
        message: 'Profile cannot be created',
      });
    }

    return res.json({
      error: false,
      message: 'Profile created succussfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: 'Oops, something went wrong',
    });
  }
};

exports.fetchProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Promotor.findOne({ userId });

    if (!profile) {
      return res.json({
        error: true,
        message: 'User profile does not exist',
      });
    }
    return res.json({
      error: false,
      message: 'Profile Found',
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: 'Oops, something went wrong',
    });
  }
};
