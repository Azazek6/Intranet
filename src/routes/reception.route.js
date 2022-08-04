//Librerias a usar
const { isReceptionist } = require("../helpers/redirection");
const { isAuthenticated } = require("../helpers/authenticated");
const {
  getRecordPage,
  getSearchPage,
  getGenerateCite,
  getPatient,
  getAllDoctor,
  getOneRecord,
  processRecord,
  processCite
} = require("../controllers/reception.controller");
const { Router } = require("express");
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

module.exports = router;
