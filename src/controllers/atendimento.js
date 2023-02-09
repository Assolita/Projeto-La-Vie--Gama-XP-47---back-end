const { Atendimento, Paciente, Psicologo } = require("../models")

module.exports = {
    getALL: async (req, res) => {
        const atendimentos = await Atendimento.findAll( { include: [Psicologo, Paciente] } )
    
        res.json(atendimentos)
    },

    getById: async (req, res) => {
        const { params: { id }, } = req;
        const atendimento = await Atendimento.findByPk(id, { include: [Paciente, Psicologo] })

        if (atendimento){
            return res.json(atendimento)

        }
    
        res.statusCode = 404;
        res.json({ message: "Sessão de tendimento não encontrada." })
    },

    store: async (req, res) => {
        try {
            const { body: {
                data_atendimento,
                observacao,
                psicologo_id,
                paciente_id,
                }
            } = req;

            const novoAtendimento = await Atendimento.create({
                data_atendimento,
                observacao,
                psicologo_id,
                paciente_id,            
            });

            // const generosData = await Genero.findAll({
            //     where: { id: { [Op.in]: generos } }
            // });

            // await novoFilme.setGeneros(generosData) // vínculo com a tabela generos feito automaticamente pelo sequelize

            res.json(novoAtendimento);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Houve um erro ao cadastrar suas informações, tente novamente :((" })
        }

    },

    update: async (req, res) => {
        const {
            params: { id },
            body: {
                data_atendimento,
                observacao,
                psicologo_id,
                paciente_id,
            }
        } = req;

        const atendimento = await Atendimento.findByPk(id);

        if (!atendimento){
            res.statusCode = 404;
            res.json({ message: "não é possível atualizar um atendimento que não existe :(" })
        }
        
        await filme.update({
            data_atendimento,
            observacao,
            psicologo_id,
            paciente_id,
        })


        // if (Array.isArray(genero)) {

        //     const generosData = await Genero.findAll({
        //         where: { id: { [Op.in]: generos } }
        //     });

        //     await filme.setGeneros(generosData)
        // }

        const atendimentoAtualizado = await Atendimento.findByPk(id)

        res.json(atendimentoAtualizado);
    },

    destroy: async (req, res) => {
        const { params: { id }, } = req;
        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento){
            res.statusCode = 404;
            res.json({ message: "não é possível deletar um atendimento que não existe :(" })
            return;
        }
        
        // await filme.setGeneros([]); // deletar primeiro os generos (vinculos)
        await psicologo.destroy();

        res.sendStatus(204);

    
    }
}