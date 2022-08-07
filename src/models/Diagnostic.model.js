import moongose from "mongoose";

const diagnosticModel = new moongose.Schema({
  diagnostic: { type: String, require: true },
  doctor: { type: String, require: true },
  patient: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

export default moongose.model("Diagnostic", diagnosticModel);
