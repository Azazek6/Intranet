//Librerias a usar
const { Router } = require("express");
const {main} = require('../controllers/index.controller');
const { isAuthenticated } = require("../helpers/authenticated");
//Iniciando
const router = Router();

//Rutas Principales

router.get('/',isAuthenticated,main);

module.exports = router;
