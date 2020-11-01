const mongoose = require('mongoose')
const moment = require('moment')

const UserSchema = new mongoose.Schema({
  stravaId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    default: moment().subtract(5, 'hours')
  },
  createdAt: {
    type: Date,
    default: moment()
  },
})

module.exports = mongoose.model('User', UserSchema)
