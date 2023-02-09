const express = require('express');
const psicologoControllers = require('../controllers/psicologo');


const router = express.Router();

router.get("/", psicologoControllers.getALL)
router.get("/:id", psicologoControllers.getById)
router.post("/", psicologoControllers.store)
router.put("/:id", psicologoControllers.update)
router.delete("/:id", psicologoControllers.destroy)

module.exports = router;