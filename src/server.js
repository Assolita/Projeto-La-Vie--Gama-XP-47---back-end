const express = require('express');
const database = require("./services/database")

const mainRoutes = require("./routes/main")
const psicologoRoutes = require("./routes/psicologo")
const pacienteRoutes = require("./routes/paciente")
const atendimentoRoutes = require("./routes/atendimento")
const authRoutes = require("./routes/auth")
const dashRoutes = require("./routes/dashboard")

const handleErrorMiddleware = require("./middlewares/handleError");
const jwtMiddleware = require("./middlewares/jwt");
const authMiddleware = require("./middlewares/auth");


const server = express();
const port = 3000;

server.use(express.json()); 

server.use(
    jwtMiddleware.unless({
        path: ["/", "/psicologos", "/auth/login", "/auth/register"]
}));

server.use(authMiddleware)

server.use("/", mainRoutes)
server.use("/auth", authRoutes)
server.use("/psicologos", psicologoRoutes)
server.use("/pacientes", pacienteRoutes)
server.use("/atendimentos", atendimentoRoutes)
server.use("/dashboard", dashRoutes)

server.use(handleErrorMiddleware)

server.use((req, res) => {
    res.sendStatus(404);
});

const main = async () => {
    try { 
        database.authenticate();
        await database.sync()

        server.listen(port, () => {
            console.log(`servidor rodando na porta ${port}`)
        })
    } catch (error) {
        console.error('unable to connect to the database:', error);
    }

}
main();
