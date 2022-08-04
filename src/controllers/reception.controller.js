const Record = require("../models/Record.model");
const Especiality = require("../models/Especiality.model");
const Doctor = require("../models/Doctor.model");
const Cite = require("../models/Cite.model");
const receptionController = {};

receptionController.getRecordPage = (req, res) => {
  res.render("receptions/add-record");
};
receptionController.getGenerateCite = async (req, res) => {
  const especialities = await Especiality.find().lean();
  res.render("receptions/generate-cite", { especialities });
};
receptionController.getSearchPage = (req, res) => {
  res.render("receptions/search-record");
};

//Procesos
receptionController.processRecord = async (req, res) => {
  const { record, dni, lastname, name, age, date_of_birth, address, status } =
    req.body;
  const validateDni = await Record.findOne({ dni: dni });
  const validateRecord = await Record.findOne({ record: record });
  if (
    !record ||
    !dni ||
    !name ||
    !lastname ||
    !age ||
    !date_of_birth ||
    !address ||
    !status
  ) {
    req.flash("error_msg", "Existen campos vacios.");
    res.redirect("/receptionist/addRecord");
  } else if (isNaN(dni)) {
    req.flash("error_msg", "Campo DNI debe ser numerico");
    res.redirect("/receptionist/addRecord");
  } else if (dni.length != 8) {
    req.flash("error_msg", "Campo DNI debe ser solo de 8 digitos");
    res.redirect("/receptionist/addRecord");
  } else if (isNaN(age)) {
    req.flash("error_msg", "Campo Edad debe ser numerico");
    res.redirect("/receptionist/addRecord");
  } else if (age.length != 2) {
    req.flash("error_msg", "Campo Edad solo debe tener 2 digitos");
    res.redirect("/receptionist/addRecord");
  } else {
    if (validateRecord != null) {
      req.flash("error_msg", "El numero de historial ya existe");
      res.redirect("/receptionist/addRecord");
    } else if (validateDni != null) {
      req.flash("error_msg", "El DNI ingresado ya existe en la base de datos");
      res.redirect("/receptionist/addRecord");
    } else {
      const newRecord = new Record({
        record,
        dni,
        lastname,
        name,
        age,
        date_of_birth,
        address,
        status,
      });
      await newRecord.save();
      req.flash("success_msg", "Se ha registrado un nuevo historial");
      res.redirect("/receptionist/addRecord");
    }
  }
};

//Generar Cita Médica
receptionController.processCite = async (req, res) => {
  const { patient, dni, name, date, especialitys, doctors, amount } = req.body;
  if (patient != "") {
    if (
      dni === "" ||
      name === "" ||
      date === "" ||
      especialitys === "" ||
      doctors === "" ||
      amount === ""
    ) {
      req.flash("error_msg", "Existen campos vacios.");
      res.redirect("/receptionist/generate-cite");
    } else {
      const newCite = new Cite({
        dni,
        name,
        date,
        especialitys,
        doctors,
        amount,
      });
      await newCite.save();
      req.flash("success_msg", "Cita generada con éxito");
      res.redirect("/receptionist/generate-cite");
    }
  } else {
    req.flash(
      "error_msg",
      "Primero elija un paciente antes de generar la cita"
    );
    res.redirect("/receptionist/generate-cite");
  }
};

//Buscar un solo registro
receptionController.getOneRecord = async (req, res) => {
  const { dni } = req.body;
  if (!isNaN(dni)) {
    const data = await Record.findOne({ dni: dni });
    if (data != null) {
      res.json(data);
    } else {
      res.json(1);
    }
  } else {
    res.json(0);
  }
};

//Obtener paciente
receptionController.getPatient = async (req, res) => {
  const { dni } = req.body;
  const data = await Record.findOne({ dni: dni });
  if (data != null) {
    res.json(data);
  } else {
    res.json(0);
  }
};

//Obtener doctores
receptionController.getAllDoctor = async (req, res) => {
  const { especiality } = req.body;
  const data = await Doctor.find({ especiality: especiality }).lean();
  if (data != null) {
    res.json(data);
  } else {
    res.json(0);
  }
};

module.exports = receptionController;
