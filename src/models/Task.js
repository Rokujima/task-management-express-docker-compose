const Sequelize = require('sequelize');
const sequelize = require('./../config/database');

const Task = sequelize.define('task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.TEXT,
  assignedTo: Sequelize.INTEGER,
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
