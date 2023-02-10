const { Paciente, Atendimento } = require("../models")

module.exports = {
    dashPacientes: async (req, res) => {
        const pacientes = await Paciente.findAll()

        if (pacientes.length >= 1){
            return res.json(pacientes.length)
        }
        
        res.json({ message: "Não há pacientes à serem exibidos." })
    },

    getALL: async (req, res) => {
        const pacientes = await Paciente.findAll( {include: Atendimento } )
    
        if (pacientes.length >= 1){
            return res.json(pacientes)
        }
        
        res.json({ message: "Não há pacientes à serem exibidos." })
    },

    getById: async (req, res) => {
        const { params: { id }, } = req;
        const paciente = await Paciente.findByPk(id, {include: Atendimento })

        if (paciente){
            return res.json(paciente)

        }
      
        res.statusCode = 404;
        res.json({ message: "Paciente não encontrado ou não existe." })
    },

    store: async (req, res) => {
        try {
            const { body: {
                nome,
                idade,
                email,
                }
            } = req;

            const novoPaciente = await Paciente.create({
                nome,
                idade,
                email,
                           
            });

            res.json(novoPaciente);

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
                idade,
                email,
            }
        } = req;

        const paciente = await Paciente.findByPk(id);

        if (!paciente){
            res.statusCode = 404;
            res.json({ message: "não é possível atualizar um cadastro que não existe :(" })
        }
        
        await paciente.update({ nome, idade, email })


        const pacienteAtualizado = await Paciente.findByPk(id)

        res.json(pacienteAtualizado);
    },

    destroy: async (req, res) => {
        const { params: { id }, } = req;
        const paciente = await Paciente.findByPk(id)

        if (!paciente){
            res.statusCode = 404;
            res.json({ message: "não é possível deletar um paciente que não existe :(" })
            return;
        }
        
        await paciente.destroy();

        res.sendStatus(204);

    
    }
}