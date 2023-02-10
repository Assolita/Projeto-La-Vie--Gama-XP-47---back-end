const express = require('express');

const psicologoControllers = require('../controllers/psicologo');
const psicologoValidator = require("../validators/psicologo")


const router = express.Router();

router.get("/", psicologoControllers.getALL)
router.get("/:id", psicologoControllers.getById)
router.post("/", psicologoValidator.store, psicologoControllers.store)
router.put("/:id", psicologoValidator.update, psicologoControllers.update)
router.delete("/:id", psicologoControllers.destroy)

module.exports = router;