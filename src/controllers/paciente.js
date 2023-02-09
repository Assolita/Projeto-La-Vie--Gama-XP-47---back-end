const { Paciente, Atendimento } = require("../models")

module.exports = {
    getALL: async (req, res) => {
        const pacientes = await Paciente.findAll( {include: Atendimento } )
    
        res.json(pacientes)
    },

    getById: async (req, res) => {
        const { params: { id }, } = req;
        const paciente = await Paciente.findByPk(id, {include: Atendimento })

        if (paciente){
            return res.json(paciente)

        }
    
        // res.sendStatus(404);  
        res.statusCode = 404;
        res.json({ message: "Paciente não encontrado ou não existe." })
    },

    store: async (req, res) => {
        try {
            const { body: {
                nome,
                idade,
                }
            } = req;

            const novoPaciente = await Paciente.create({
                nome,
                idade,
                           
            });

            // const generosData = await Genero.findAll({
            //     where: { id: { [Op.in]: generos } }
            // });

            // await novoFilme.setGeneros(generosData) // vínculo com a tabela generos feito automaticamente pelo sequelize

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
            }
        } = req;

        const paciente = await Paciente.findByPk(id);

        if (!paciente){
            res.statusCode = 404;
            res.json({ message: "não é possível atualizar um cadastro que não existe :(" })
        }
        
        await paciente.update({ nome, idade })


        // if (Array.isArray(genero)) {

        //     const generosData = await Genero.findAll({
        //         where: { id: { [Op.in]: generos } }
        //     });

        //     await filme.setGeneros(generosData)
        // }

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
        
        // await filme.setGeneros([]); // deletar primeiro os generos (vinculos)
        await paciente.destroy();

        res.sendStatus(204);

    
    }
}