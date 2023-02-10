const express = require('express');

const pacienteControllers = require('../controllers/paciente');
const atendimentoControllers = require("../controllers/atendimento")
const psicologoControllers = require("../controllers/psicologo")

const router = express.Router();

router.get("/numero-pacientes", pacienteControllers.dashPacientes)
router.get("/numero-psicologos", psicologoControllers.dashPsicologos)
router.get("/numero-atendimentos", atendimentoControllers.dashAtendimentos)
router.get("/media-atendimentos", psicologoControllers.mediaAtendimento)


module.exports = router;