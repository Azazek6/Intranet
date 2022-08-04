const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const especialModel = new mongoose.Schema({
  name: {type: String, require: true}
});

module.exports = mongoose.model('Especialities',especialModel);