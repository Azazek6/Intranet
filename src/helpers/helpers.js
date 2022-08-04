const Admin = require("../models/Admin.model");
const Doctor = require("../models/Doctor.model");
const Recepcionist = require("../models/Reception.model");
const helpers = {};

helpers.isAdmin = (user) => {
  if (user != null) {
    if (user.rol == "Administrador") {
      return true;
    }
  } else {
    return false;
  }
};
helpers.isDoctor = (user) => {
  if (user != null) {
    if (user.rol == "Doctor") {
      return true;
    }
  } else {
    return false;
  }
};
helpers.isRecepcionist = (user) => {
  if (user != null) {
    if (user.rol == "Recepcionista") {
      return true;
    }
  } else {
    return false;
  }
};
helpers.getNameUser = async (user) => {
  let names = "";
  if (user != null) {
    const admin = await Admin.findById(user.user).lean();
    const doctor = await Doctor.findById(user.user).lean();
    const receptionist = await Recepcionist.findById(user.user).lean();
    if (admin) {
      names = admin.name + " " + admin.lastname;
      return names;
    }
    if (doctor) {
      names = doctor.name + " " + doctor.lastname;
      return names;
    }
    if (receptionist) {
      names = receptionist.name + " " + receptionist.lastname;
      return names;
    }
  }
};
helpers.setDate = (date) => {
  const setNewDate = new Date(date);
  const newDate = setNewDate.toDateString();
  return newDate;
};

module.exports = helpers;
