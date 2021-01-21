// @ts-check
const { DataTypes, Sequelize } = require('sequelize')

/**
 * Init Dog model for Sequelize
 * @param {Sequelize} sequelize
 */
function taskInit(sequelize) {
    const TaskModel = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        checked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {})
    return TaskModel
}

module.exports = taskInit