const express = require('express');
const pacienteControllers = require('../controllers/paciente');


const router = express.Router();

router.get("/", pacienteControllers.getALL)
router.get("/:id", pacienteControllers.getById)
router.post("/", pacienteControllers.store)
router.put("/:id", pacienteControllers.update)
router.delete("/:id", pacienteControllers.destroy)

module.exports = router;