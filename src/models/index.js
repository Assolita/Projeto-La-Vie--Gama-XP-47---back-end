const Psicologo = require ("./psicologo");
const Paciente = require("./paciente")
const Atendimento = require("./atendimento");




Paciente.hasMany(Atendimento);

Atendimento.belongsTo(Paciente, {
    foreignKey: "paciente_id"
})

Psicologo.hasMany(Atendimento);

Atendimento.belongsTo(Psicologo, {
    foreignKey: "psicologo_id"
})


// Psicologo.hasMany(Paciente, {
//     foreignKey: "paciente_id",
//     through: Atendimento
// });

// Paciente.hasMany(Atendimento, {
//     foreignKey: "paciente_id",

// });






module.exports = {
    Psicologo,
    Paciente,
    Atendimento,

}