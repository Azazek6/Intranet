import mongoose from "mongoose";

const recordModel = new mongoose.Schema({
  record: { type: Number, require: true },
  dni: { type: Number, require: true },
  lastname: { type: String, require: true },
  name: { type: String, require: true },
  age: { type: Number, require: true },
  date_of_birth: { type: Date, require: true },
  address: { type: String, require: true },
  status: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Record", recordModel);
