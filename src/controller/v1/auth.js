const User = require('../../model/v1/users');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const { cloudinary } = require('../../middleware/cloudinary')
const secret = process.env.SECRET;

exports.signUp = async (req, res) => {
  try {
    const { name, email, number, password, role } = req.body;

    if (!name || !email || !number || !password) {
      return res.json({
        error: true,
        message: 'Incomplete Details',
      });
    }

    const defaultImage = await cloudinary.uploader.upload(req.file.path,
    function (error, result) {
      console.log(result, error) })

    const newuser = new User({
        picture : defaultImage.secure_url
    })


    const userNumber = await User.findOne({ number: number });

    if (userNumber) {
      return res.json({
        error: true,
        message: 'Account already created, please use sign in',
      });
    }

    const userEmail = await User.findOne({ email: email });

    if (userEmail) {
      return res.json({
        error: true,
        message: 'Account already created, please use sign in',
      });
    }

    // NO ACCOUNT FOUND

    // CHECK FOR REQUESTING ROLE
    if (role == 0) {
      return res.json({
        error: true,
        message: 'Please contact Admin',
      });
    }

    // ENCRPT PASSWORD
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.json({
          error: true,
          message: 'Weak password',
        });
      } else {
        // CREATE USER
        const createUser = new User({
          name,
          email,
          number,
          password: hash,
          picture: defaultImage.secure_url,
          role: role,
        }).save();

        if (!createUser) {
          return res.json({
            error: true,
            message: 'Account cannot be created',
          });
        }

        return res.json({
          error: true,
          message: 'Account Created successfully',
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: 'Oops, something went wrong',
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { id, password } = req.params;

    if (!id || !password) {
      return res.json({
        error: true,
        message: 'Incomplete Details',
      });
    }

    // FIND USER BY ID
    // const user = await User.findOne({ $or: [{ email: id }, { number: id }] });
    const user = await User.findOne({ email: id });

    if (!user)
      return res.json({
        error: true,
        message: 'number not found',
      });

    // MATCH USER ENRCYPTED PASSWORD
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.json({
        error: true,
        message: 'Password does not matched',
      });

    //PASSWORD MATCHED
    const data = {
      name: user.name,
      picture: user.picture,
      email: user.email,
      id: user._id,
      role: user.role,
    };
    // JWT TOKEN SIGN
    const token = jsonWebToken.sign(data, secret, {
      expiresIn: '30d',
    });
    return res.json({
      error: false,
      message: 'Signin Successfully',
      token: 'Bearer ' + token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: 'Something wents wrong, Please try after sometime',
    });
  }
};
