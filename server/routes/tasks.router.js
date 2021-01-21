const express = require('express')
const tasksRouter = express.Router()
const { Task } = require('../models')

// API http
// routing
// Restful API (CRUD)
// C - create R - read U - update D - delete
// C - POST (HTTP)
// R - GET (HTTP)
// U - PATCH/PUT (HTTP)
// D - DELETE (HTTP)

tasksRouter.get('/', async (req, res) => {
    const tasks = await Task.findAll()
    res.send(tasks)
})

tasksRouter.get('/:taskId', async (req, res, next) => {
    const taskId = req.params.taskId
    const task = await Task.findOne({
        where: {
            id: taskId
        }
    })
    if (task) res.send(task)
    else res.status(404).send(`Can't find a task with id ${taskId}`)
})

tasksRouter.post('/', async (req, res) => {
    const { name, checked } = req.body
    const task = await Task.create({ name, checked })
    res.send(task)
})

tasksRouter.patch('/:taskId', async (req, res, next) => {
    const taskId = req.params.taskId
    const updatedTask = req.body
    const result = await Task.update(updatedTask, {
        where: {
            id: taskId
        }
    })
    if (result[0]) res.send({ message: "Successful update" })
    else res.status(404).send(`Can't find a task with id ${taskId}`)
})

tasksRouter.delete('/:taskId', async (req, res, next) => {
    const taskId = +req.params.taskId
    const result = await Task.destroy({
        where: {
            id: taskId
        }
    })
    if (result) {
        res.send({
            message: "Successful destroy"
        })
    } else {
        res.status(404).send(`Can't find a task with id ${taskId}`)
    }
})

module.exports = tasksRouter