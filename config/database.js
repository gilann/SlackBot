const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.Database, process.env.User, process.env.Password, {
    host: process.env.host,
    dialect:'postgres',
    operatorsAliases:'false',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:1000
    }
});

module.exports = sequelize;
