const Reception = require("../models/Reception.model");
const User = require("../models/User.model");
const Admin = require("../models/Admin.model");
const Doctor = require("../models/Doctor.model");
const adminController = {};

adminController.addRepPage = (req, res) => {
  res.render("admin/add-receptionist", {
    title: "Recepcionistas",
    action: "addReceptionist",
  });
};

adminController.addDocPage = (req, res) => {
  res.render("admin/add-doctors", {
    title: "Doctores",
    action: "addDoctor",
    especiality: true,
  });
};

adminController.addAdmPage = (req, res) => {
  res.render("admin/add-admins", {
    title: "Administradores",
    action: "addAdmin",
  });
};

//Procesos
adminController.ProccessRepPage = async (req, res) => {
  const { dni, name, lastname, phone, email } = req.body;
  const validateDni = await Reception.findOne({ dni: dni });

  if (!dni || !name || !lastname || !phone || !email) {
    req.flash("error_msg", "Existen campos vacios.");
    res.redirect("/admin/addReceptionist");
  } else if (isNaN(dni)) {
    req.flash("error_msg", "Campo DNI debe ser numerico");
    res.redirect("/admin/addReceptionist");
  } else if (dni.length != 8) {
    req.flash("error_msg", "Campo DNI debe ser solo de 8 digitos");
    res.redirect("/admin/addReceptionist");
  } else if (isNaN(phone)) {
    req.flash("error_msg", "Campo telefono debe ser numerico");
    res.redirect("/admin/addReceptionist");
  } else if (phone.length != 9) {
    req.flash("error_msg", "Campo telefono debe ser solo de 9 digitos");
    res.redirect("/admin/addReceptionist");
  } else {
    if (validateDni != null) {
      req.flash(
        "error_msg",
        "El DNI ingresado ya se encuentra registrado en la base de datos"
      );
      res.redirect("/admin/addReceptionist");
    } else {
      const addReceptionist = new Reception({
        dni,
        name,
        lastname,
        phone,
        email,
      });
      await addReceptionist.save();
      const dniRecep = await Reception.findOne({ dni: dni }).lean();
      const createUser = new User({
        username: dni,
        password: dni,
        rol: "Recepcionista",
        user: dniRecep._id,
      });
      createUser.password = await createUser.passwordEncrypt(dni);
      await createUser.save();
      req.flash("success_msg", "Se ha registrado nuevo Recepsionista");
      res.redirect("/admin/addReceptionist");
    }
  }
};

adminController.ProccessDocPage = async (req, res) => {
  const { dni, name, lastname, phone, email, especiality } = req.body;
  const validateDni = await Doctor.findOne({ dni: dni });
  if (!dni || !name || !lastname || !phone || !email || !especiality) {
    req.flash("error_msg", "Existen campos vacios.");
    res.redirect("/admin/addDoctor");
  } else if (isNaN(dni)) {
    req.flash("error_msg", "Campo DNI debe ser numerico");
    res.redirect("/admin/addDoctor");
  } else if (dni.length != 8) {
    req.flash("error_msg", "Campo DNI debe ser solo de 8 digitos");
    res.redirect("/admin/addDoctor");
  } else if (isNaN(phone)) {
    req.flash("error_msg", "Campo telefono debe ser numerico");
    res.redirect("/admin/addDoctor");
  } else if (phone.length != 9) {
    req.flash("error_msg", "Campo telefono debe ser solo de 9 digitos");
    res.redirect("/admin/addDoctor");
  } else {
    if (validateDni != null) {
      req.flash(
        "error_msg",
        "El DNI ingresado ya se encuentra registrado en la base de datos"
      );
      res.redirect("/admin/addDoctor");
    } else {
      const addDoctor = new Doctor({
        dni,
        name,
        lastname,
        phone,
        email,
        especiality,
      });
      await addDoctor.save();
      const dniDoctor = await Doctor.findOne({ dni: dni }).lean();
      const createUser = new User({
        username: dni,
        password: dni,
        rol: "Doctor",
        user: dniDoctor._id,
      });
      createUser.password = await createUser.passwordEncrypt(dni);
      await createUser.save();
      req.flash("success_msg", "Se ha registrado nuevo Doctor");
      res.redirect("/admin/addDoctor");
    }
  }
};

adminController.ProccessAdmPage = async (req, res) => {
  const { dni, name, lastname, phone, email } = req.body;
  const validateDni = await Admin.findOne({ dni: dni });
  if (!dni || !name || !lastname || !phone || !email) {
    req.flash("error_msg", "Existen campos vacios.");
    res.redirect("/admin/addAdmin");
  } else if (isNaN(dni)) {
    req.flash("error_msg", "Campo DNI debe ser numerico");
    res.redirect("/admin/addAdmin");
  } else if (dni.length != 8) {
    req.flash("error_msg", "Campo DNI debe ser solo de 8 digitos");
    res.redirect("/admin/addAdmin");
  } else if (isNaN(phone)) {
    req.flash("error_msg", "Campo telefono debe ser numerico");
    res.redirect("/admin/addAdmin");
  } else if (phone.length != 9) {
    req.flash("error_msg", "Campo telefono debe ser solo de 9 digitos");
    res.redirect("/admin/addAdmin");
  } else {
    if (validateDni != null) {
      req.flash(
        "error_msg",
        "El DNI ingresado ya se encuentra registrado en la base de datos"
      );
      res.redirect("/admin/addAdmin");
    } else {
      const addAdmin = new Admin({ dni, name, lastname, phone, email });
      await addAdmin.save();
      const dniAdmin = await Admin.findOne({ dni: dni }).lean();
      const createUser = new User({
        username: dni,
        password: dni,
        rol: "Administrador",
        user: dniAdmin._id,
      });
      createUser.password = await createUser.passwordEncrypt(dni);
      await createUser.save();
      req.flash("success_msg", "Se ha registrado nuevo Administrador");
      res.redirect("/admin/addAdmin");
    }
  }
};

module.exports = adminController;
