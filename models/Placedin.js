const Sequelize = require('sequelize');
const db = require('../config/database');

var Placedin = db.define('placedin', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  Placedin.sync({ force: false }).then(function() {
    return true;
});

module.exports = Placedin;