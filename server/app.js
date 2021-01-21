const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks.router')
const { sequelize } = require('./models');
const cors = require('cors');

(async function sync() {
    await sequelize.authenticate()
    console.log('Successful connection')
    await sequelize.sync()
    console.log('Successful sync')
    start()
})()

function start() {
    app.use(cors())
    app.use(express.json())
    
    app.get('/', (req, res) => {
        res.send('App root')
    })
    
    app.use('/api/task', taskRouter)
    
    app.listen(4000, () => {
        console.log('Server started at http://localhost:4000')
    })
}