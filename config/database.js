const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.Database, process.env.User, process.env.Password, {
    host: 'ec2-54-221-212-126.compute-1.amazonaws.com',
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
