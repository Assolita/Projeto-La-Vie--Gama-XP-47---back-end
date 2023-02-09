const express = require('express');
const atendimentoControllers = require('../controllers/atendimento');


const router = express.Router();

router.get("/", atendimentoControllers.getALL)
router.get("/:id", atendimentoControllers.getById)
router.post("/", atendimentoControllers.store)
router.put("/:id", atendimentoControllers.update)
router.delete("/:id", atendimentoControllers.destroy)

module.exports = router;