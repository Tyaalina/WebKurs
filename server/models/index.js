// @ts-check
const { Sequelize } = require('sequelize')
const taskInit = require('./Task')

const sequelize = new Sequelize('TaskModel', 'root', '00000000', {
    host: 'localhost',
    dialect: 'mysql'
});

const Task = taskInit(sequelize)

module.exports = {
    sequelize,
    Task
}

// todolist
// todo_user
// 1385K1