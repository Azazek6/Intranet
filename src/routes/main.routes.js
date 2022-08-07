//Librerias a usar
import { Router } from "express";
import { main } from "../controllers/index.controller.js";
import { isAuthenticated } from "../helpers/authenticated.js";
//Iniciando
const router = Router();

//Rutas Principales

router.get("/", isAuthenticated, main);

export default router;
