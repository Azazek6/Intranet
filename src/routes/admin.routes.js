//Librerias a usar
import { isAdmin } from "../helpers/redirection.js";
import { isAuthenticated } from "../helpers/authenticated.js";
import { Router } from "express";
import {
  addRepPage,
  addDocPage,
  addAdmPage,
  ProccessAdmPage,
  ProccessDocPage,
  ProccessRepPage,
} from "../controllers/admin.controller.js";
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

export default router;
