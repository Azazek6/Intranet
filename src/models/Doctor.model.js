const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const doctorModel = new mongoose.Schema({
  dni: {type: Number, require: true},
  name: {type: String, require: true},
  lastname: {type: String, require: true},
  phone: {type: Number, require: false, default: null},
  email: {type: String, require: false, default: null},
  especiality: {type: String, require: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Doctor',doctorModel);