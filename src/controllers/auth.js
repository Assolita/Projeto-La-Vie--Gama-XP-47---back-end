const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Psicologo } = require("../models");
const secret = require("../config/secret")


module.exports = {
    login: async (req, res) => {
        const { body: { email, senha } } = req;

        const psicologo = await Psicologo.findOne({ where: { email } });

        if (!psicologo || !bcrypt.compareSync(senha, psicologo.senha)){
            return res.status(401).json({ message: "E-mail ou senha inválido, verifique e tente novamente" })
        }

        const dadosPsicologo = {
            id: psicologo.id,
            email: psicologo.email,
            nome: psicologo.nome,
        }

        const token = jwt.sign(dadosPsicologo, secret.key)

        res.status(200).json({
            token,
            psicologo: dadosPsicologo,
        })
    },

    registro: async (req, res) => {
        const { body: { nome, email, senha, apresentacao },
        } = req;

        const hashSenha = bcrypt.hashSync(senha, 10);

        const psicologoExistente = await Psicologo.findOne({ where: { email } });
        
        if (psicologoExistente){
            return res.status(400).json({ message: "o email solicitado já está em uso." })
        }

        const { id } = await Psicologo.create({
            nome,
            email,
            apresentacao,
            senha: hashSenha,
        })

        const psicologo = {
            id,
            nome,
            email,
            senha: hashSenha,
            apresentacao
        };

        const token = jwt.sign(psicologo, secret.key);

        res.status(201).json({
            token,
            psicologo,

        })
    },
}