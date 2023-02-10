const express = require('express');

const pacienteControllers = require('../controllers/paciente');
const pacienteValidator = require("../validators/paciente")


const router = express.Router();

router.get("/", pacienteControllers.getALL)
router.get("/:id", pacienteControllers.getById)
router.post("/", pacienteValidator.store, pacienteControllers.store)
router.put("/:id", pacienteValidator.update, pacienteControllers.update)
router.delete("/:id", pacienteControllers.destroy)

module.exports = router;