const Cites = require("../models/Cite.model");
const Record = require("../models/Record.model");
const Doctor = require("../models/Doctor.model");
const Diagnostic = require("../models/Diagnostic.model");
const { setDate } = require("../helpers/helpers");

const doctorController = {};

//Controladores principales
doctorController.getCites = async (req, res) => {
  const cites = await Cites.find({ doctors: req.user.user })
    .sort({ date: "desc" })
    .lean();
  res.render("doctors/view-all-cites", { cites });
};
doctorController.getCitesPending = async (req, res) => {
  const cites = await Cites.find({
    doctors: req.user.user,
    status: "Pendiente",
  })
    .sort({ date: "desc" })
    .lean();
  res.render("doctors/view-all-pending", { cites });
};
//
doctorController.getCitesProcess = async (req, res) => {
  const dni = req.params.dni;
  const idCite = req.params.id;
  if (dni == "") {
    req.flash("error_msg", "Solicitud prohibida");
    res.redirect("/doctor/cites");
  }
  const dataRecord = await Record.findOne({ dni: dni }).lean();
  const dataCite = await Cites.findById(idCite).lean();
  const idDoctor = dataCite.doctors;
  const getDoctor = await Doctor.findById(idDoctor).lean();
  const newDateBirth = setDate(dataRecord.date_of_birth);
  const date = new Date();
  const dateNow = date.toLocaleDateString();
  res.render("doctors/process-cite", {
    dataRecord,
    dataCite,
    newDateBirth,
    getDoctor,
    dateNow,
  });
};

//Procesos
doctorController.processDiagnostic = async (req, res) => {
  const { diagnostic, doctor, patient, cite } = req.body;
  if (diagnostic == "" || doctor == "" || patient == "") {
    res.json(null);
  } else {
    const newDiagnostic = new Diagnostic({ diagnostic, doctor, patient });
    const re = await newDiagnostic.save();
    if (re != null) {
      await Cites.findByIdAndUpdate(cite, { $set: { status: "Completo" } });
      res.json(1);
    }
  }
};

module.exports = doctorController;
