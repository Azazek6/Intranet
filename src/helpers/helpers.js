import Admin from "../models/Admin.model.js";
import Doctor from "../models/Doctor.model.js";
import Recepcionist from "../models/Reception.model.js";

export const isAdmin = (user) => {
  if (user != null) {
    if (user.rol == "Administrador") {
      return true;
    }
  } else {
    return false;
  }
};
export const isDoctor = (user) => {
  if (user != null) {
    if (user.rol == "Doctor") {
      return true;
    }
  } else {
    return false;
  }
};
export const isRecepcionist = (user) => {
  if (user != null) {
    if (user.rol == "Recepcionista") {
      return true;
    }
  } else {
    return false;
  }
};
export const getNameUser = async (user) => {
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
export const setDate = (date) => {
  const setNewDate = new Date(date);
  const newDate = setNewDate.toDateString();
  return newDate;
};
