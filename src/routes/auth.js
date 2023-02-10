const express = require('express'); 

const authController = require("../controllers/auth")
const authValidator = require("../validators/auth")



const router = express.Router();

router.post("/login", authValidator.login, authController.login);
router.post("/register", authValidator.registro, authController.registro)

module.exports = router;