//Librerias a usar
import { isReceptionist } from "../helpers/redirection.js";
import { isAuthenticated } from "../helpers/authenticated.js";
import {
  getRecordPage,
  getSearchPage,
  getGenerateCite,
  getPatient,
  getAllDoctor,
  getOneRecord,
  processRecord,
  processCite,
} from "../controllers/reception.controller.js";
import { Router } from "express";
const router = Router();

router.get("/addRecord", isAuthenticated, isReceptionist, getRecordPage);
router.get("/generate-cite", isAuthenticated, isReceptionist, getGenerateCite);
router.get("/search", isAuthenticated, isReceptionist, getSearchPage);

//Procesos
router.post("/addRecord", isAuthenticated, isReceptionist, processRecord);
router.post("/addCite", isAuthenticated, isReceptionist, processCite);
router.post("/search", isAuthenticated, isReceptionist, getOneRecord);
router.post("/getPatient", isAuthenticated, isReceptionist, getPatient);
router.post("/getAllDoctor", isAuthenticated, isReceptionist, getAllDoctor);

export default router;
