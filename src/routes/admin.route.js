//Librerias a usar
const { isAdmin } = require("../helpers/redirection");
const { isAuthenticated } = require("../helpers/authenticated");
const { Router } = require("express");
const {
  addRepPage,
  addDocPage,
  addAdmPage,
  ProccessAdmPage,
  ProccessDocPage,
  ProccessRepPage,
} = require("../controllers/admin.controller");
//Iniciando
const router = Router();

//Rutas Principales
router.get("/addReceptionist", isAuthenticated, isAdmin, addRepPage);
router.get("/addDoctor", isAuthenticated, isAdmin, addDocPage);
router.get("/addAdmin", isAuthenticated, isAdmin, addAdmPage);

//Procesos
router.post("/addReceptionist", ProccessRepPage);
router.post("/addDoctor", ProccessDocPage);
router.post("/addAdmin", ProccessAdmPage);

module.exports = router;
