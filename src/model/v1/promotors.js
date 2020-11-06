const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  profession: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  from: {
    type: String,
  },
  nickname: {
    type: String,
  },
  memberof: {
    type: String,
  },
  workat: {
    type: String,
  },
  achievements: {
    type: String,
  },
  workingfor: {
    type: String,
  },
  interestedin: {
    type: String,
  },
  protoming: {
    type: String,
  },
  inspiredby: {
    type: String,
  },
  passion: {
    type: String,
  },
  aspirantof: {
    type: String,
  },
  learning: {
    type: String,
  },
  belongto: {
    type: String,
  },
  committedto: {
    type: String,
  },
  believein: {
    type: String,
  },
  haterof: {
    type: String,
  },
  hobby: {
    type: String,
  },
  like: {
    type: String,
  },
  joined: {
    type: Number,
  },
  link: {
    type: String,
  },
});

module.exports = Promotor = mongoose.model('promotors', PromotorSchema);
