const { Atendimento, Paciente, Psicologo } = require("../models")

module.exports = {
    dashAtendimentos: async (req, res) => {
        const atendimentos = await Atendimento.findAll()

        if (atendimentos.length >= 1){
            return res.json(atendimentos.length)
        }
        
        res.json({ message: "Não há atendimentos à serem exibidos." })
    },
    getALL: async (req, res) => {
        const atendimentos = await Atendimento.findAll( { include: [Psicologo, Paciente] } )
    
        if (atendimentos.length >= 1){
            return res.json(atendimentos)
        }
            res.json({ message: "Não há nenhum atendimento existente no sistema." })
    },

    getById: async (req, res) => {
        const { params: { id }, } = req;
        const atendimento = await Atendimento.findByPk(id, { include: [Paciente, Psicologo] })

        if (atendimento){
            return res.json(atendimento)

        }
    
        res.statusCode = 404;
        res.json({ message: "Sessão de atendimento não encontrada." })
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


            res.json(novoAtendimento);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Houve um erro ao cadastrar seu atendimento :(  verifique os dados e tente novamente!" })
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
            return;
        }
        
        await atendimento.update({
            data_atendimento,
            observacao,
            psicologo_id,
            paciente_id,
        })



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
        
        await atendimento.destroy();

        res.sendStatus(204);

    
    }
}