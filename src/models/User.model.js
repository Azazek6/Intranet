const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserModel = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  rol: { type: String, require: true },
  user: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

UserModel.methods.passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

UserModel.methods.passwordVerify = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserModel);
