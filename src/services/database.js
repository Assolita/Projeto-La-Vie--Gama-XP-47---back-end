const { Sequelize } = require('sequelize');

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = require('../config/database')

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;