const { Psicologo } = require("../models")

module.exports = async (req, res, next ) => {
    if (req.auth) {
        const psicologo = await Psicologo.findByPk(req.auth.id);

        if (!psicologo) {
            next({
                status: 401,
                name: "UnauthorizedError",
                inner: {
                    message: "Usuário não encontrado."
                }
            })
        }
    }
    next();
}