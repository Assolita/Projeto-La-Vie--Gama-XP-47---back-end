const { DataTypes } = require("sequelize")
const database = require("../services/database")

const Psicologo = database.define('Psicologo', {
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    
    },
    apresentacao: {
        type: DataTypes.TEXT(),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
},
{
    tableName: "psicologos",
    timestamps: false 
})

module.exports = Psicologo;