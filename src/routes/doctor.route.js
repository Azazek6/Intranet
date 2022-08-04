const { Router } = require("express");
const router = Router();
//traendo helper
const { isAuthenticated } = require("../helpers/authenticated");
const { isDoctor } = require("../helpers/redirection");
//traendo controlador
const {
  getCites,
  getCitesPending,
  getCitesProcess,
  processDiagnostic,
} = require("../controllers/doctor.controller");

//Rutas principales
router.get("/cites", isAuthenticated, isDoctor, getCites);
router.get("/cites-pending", isAuthenticated, isDoctor, getCitesPending);
//Rutas principales con procesos
router.get("/process/:dni/:id", isAuthenticated, isDoctor, getCitesProcess);
router.post("/createDiagnostic", isAuthenticated, isDoctor, processDiagnostic);

module.exports = router;
