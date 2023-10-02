const Sequelize = require('sequelize');
const sequelize = require('./../config/database');

const Account = sequelize.define('account', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = Account;
