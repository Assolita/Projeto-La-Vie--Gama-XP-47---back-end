const express = require('express'); // biblioteca express
const { welcome } = require('../controllers/main');


const router = express.Router(); // criação do server de rotas

router.get("/", welcome)

module.exports = router;