const { Psicologo, Atendimento } = require("../models")

module.exports = {
    getALL: async (req, res) => {
        const psicologos = await Psicologo.findAll( {include: Atendimento } )
    
        res.json(psicologos)
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

            // const generosData = await Genero.findAll({
            //     where: { id: { [Op.in]: generos } }
            // });

            // await novoFilme.setGeneros(generosData) // vínculo com a tabela generos feito automaticamente pelo sequelize

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
        
        await filme.update({ nome, senha, apresentacao, email }) //atualiza o filme no BD


        // if (Array.isArray(genero)) {

        //     const generosData = await Genero.findAll({
        //         where: { id: { [Op.in]: generos } }
        //     });

        //     await filme.setGeneros(generosData)
        // }

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