import { Router } from "express";
const router = Router();
//traendo helper
import { isAuthenticated } from "../helpers/authenticated.js";
import { isDoctor } from "../helpers/redirection.js";
//traendo controlador
import {
  getCites,
  getCitesPending,
  getCitesProcess,
  processDiagnostic,
} from "../controllers/doctor.controller.js";

//Rutas principales
router.get("/cites", isAuthenticated, isDoctor, getCites);
router.get("/cites-pending", isAuthenticated, isDoctor, getCitesPending);
//Rutas principales con procesos
router.get("/process/:dni/:id", isAuthenticated, isDoctor, getCitesProcess);
router.post("/createDiagnostic", isAuthenticated, isDoctor, processDiagnostic);

export default router;
