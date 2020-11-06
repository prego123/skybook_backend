const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  role: {
    type: Number,
    required: true,
  },
});

module.exports = User = mongoose.model('users', UserSchema);

// role
// 0 - Admin Profile
// 1 - Promoter Profile
// 2 - Bussiness Profile
