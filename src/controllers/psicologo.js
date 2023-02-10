const { Psicologo, Atendimento } = require("../models")

module.exports = {
    dashPsicologos: async (req, res) => {
        const psicologos = await Psicologo.findAll()

        if (psicologos.length >= 1){
            return res.json(psicologos.length)
        }
        
        res.json({ message: "Não há psicólogos à serem exibidos." })
    },
    mediaAtendimento: async (req, res) => {
        const atendimentos = await Atendimento.findAll()
        const psicologos = await Psicologo.findAll()

        if (psicologos.length >= 1 && atendimentos.length >=1){
            let psi = psicologos.length;
            let att = atendimentos.length;
            let media = att / psi
            return res.json({message: `A média de atendimento por psicólogo é ${media}`})
        }

    },
    getALL: async (req, res) => {
        const psicologos = await Psicologo.findAll( {include: Atendimento } )
    
        if (psicologos.length >= 1){
            return res.json(psicologos)
        }
            res.json({ message: "Não há psicólogos cadastrados no momento." })
    },

    getById: async (req, res) => {
        const { params: { id }, } = req;
        const psicologo = await Psicologo.findByPk(id, {include: Atendimento } )

        if (psicologo){
            return res.json(psicologo)

        }
    
        // res.sendStatus(404);  
        res.statusCode = 404;
        res.json({ message: "Profissional psicologo não encontrado" })
    },

    store: async (req, res) => {
        try {
            const { body: {
                nome,
                senha,
                apresentacao,
                email
                }
            } = req;

            const novoPsicologo = await Psicologo.create({
                nome,
                senha,
                apresentacao,
                email              
            });


            res.json(novoPsicologo);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Houve um erro ao cadastrar suas informações, tente novamente :((" })
        }

    },

    update: async (req, res) => {
        const {
            params: { id },
            body: {
                nome,
                senha,
                apresentacao,
                email
            }
        } = req;

        const psicologo = await Psicologo.findByPk(id);

        if (!psicologo){
            res.statusCode = 404;
            res.json({ message: "não é possível atualizar um cadastro que não existe :(" })
        }
        
        await psicologo.update({ nome, senha, apresentacao, email }) //atualiza o filme no BD


        const psicologoAtualizado = await Psicologo.findByPk(id)

        res.json(psicologoAtualizado);
    },

    destroy: async (req, res) => {
        const { params: { id }, } = req;
        const psicologo = await Psicologo.findByPk(id)

        if (!psicologo){
            res.statusCode = 404;
            res.json({ message: "não é possível deletar um psicólogo que não existe :(" })
            return;
        }
        
        // await filme.setGeneros([]); // deletar primeiro os generos (vinculos)
        await psicologo.destroy();

        res.sendStatus(204);

    
    }
}