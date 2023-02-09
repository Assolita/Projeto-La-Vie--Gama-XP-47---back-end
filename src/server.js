const express = require('express');
const database = require("./services/database")

const mainRoutes = require("./routes/main")
const psicologoRoutes = require("./routes/psicologo")
const pacienteRoutes = require("./routes/paciente")
const atendimentoRoutes = require("./routes/atendimento")



const server = express();
const port = 3000;

server.use(express.json()); 
server.use("/", mainRoutes)
server.use("/psicologos", psicologoRoutes)
server.use("/pacientes", pacienteRoutes)
server.use("/atendimentos", atendimentoRoutes)


const main = async () => {
    try { 
        database.authenticate();

        server.listen(port, () => {
            console.log(`servidor rodando na porta ${port}`)
        })
    } catch (error) {
        console.error('unable to connect to the database:', error);
    }

}
main();
