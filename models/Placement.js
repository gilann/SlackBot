const Sequelize = require('sequelize');
const db = require('../config/database');

var Placement = db.define('placement', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  Placement.sync({ force: false }).then(function() {
    return true;
});

module.exports = Placement;
