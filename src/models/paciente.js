const { DataTypes } = require("sequelize")
const database = require("../services/database")

const Paciente = database.define('Paciente', {
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    idade: {
        type: DataTypes.DATE(),
        allowNull: false
    },
    email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    },
},
{
    tableName: "pacientes",
    timestamps: false
})

module.exports = Paciente;