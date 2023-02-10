const { Psicologo } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const autenticacao = {
    async login(req, res){
        const { email, senha } = req.body;
        const hashsenha = bcrypt.hashSync(senha, 10)
        const psicologo = await Psicologo.findOne({
            where: {
                email,
            },
        });
        if(!psicologo || !bcrypt.compareSync(senha, psicologo.senha)){
            return res.status(400).json("“E-mail ou senha inválido, verifique e tente novamente.");
        }
        const token = jwt.sign({
           id: psicologo.id,
           email: psicologo.email,
           nome: psicologo.nome 
        },
        secret.key);
        return res.json(token);
    },
}
module.exports = autenticacao;