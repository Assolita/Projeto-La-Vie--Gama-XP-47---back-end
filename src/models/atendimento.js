const { DataTypes } = require("sequelize")
const database = require("../services/database")

const Atendimento = database.define("atendimento",
    {
        psicologo_id: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        paciente_id: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        data_atendimento: {
            type: DataTypes.DATE(),
            allowNull: false
        },
        observacao: {
            type: DataTypes.STRING(255),
            allowNull: false
        },


    },
    {
        tableName: "atendimentos",
        underscored: true,
        timestamps: false
    }
);

module.exports = Atendimento;