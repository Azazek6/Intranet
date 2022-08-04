const mongoose = require("mongoose");

const citeModel = new mongoose.Schema({
  dni: { type: Number, require: true },
  name: { type: String, require: true },
  date: { type: Date, require: true },
  especialitys: { type: String, require: true },
  doctors: { type: String, require: true },
  amount: { type: Number, require: true },
  status: { type: String, require: false, default: "Pendiente" },
});

module.exports = mongoose.model("Cites", citeModel);
