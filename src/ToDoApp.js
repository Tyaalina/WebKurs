import React from 'react';
import { useState, useEffect } from 'react'
import InputTask from '../src/element/InputTask'
import TaskList from '../src/element/TaskList'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%'
    },
    paper: {
        width: 'max-content',
        height: 'max-content',
        margin: 'auto',
        padding: theme.spacing(4)
    },
    text: {
        margin: 'auto'
    }
}));

export default function ToDoApp() {
    const classes = useStyles();
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:4000/api/task')
        setTasks(await response.json())
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    async function handleSubmit(input) {
        const response = await fetch('http://localhost:4000/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: input,
                checked: false
            })
        })
        if (response.ok) {
            const newTask = await response.json()
            setTasks([...tasks, newTask])
        }
    }

    async function handleToggleTask(id, checked) {
        console.log(id, checked)
        const response = await fetch(`http://localhost:4000/api/task/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                checked: !checked
            })
        })
        if (response.ok) {
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, checked: !checked } : { ...task }))
        }
    };

    async function deleteTask(id) {
        fetch(`http://localhost:4000/api/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        }).then((response) => {
            if (response.ok) {
                fetchTasks();
            }
        })
    };



    return (
        <div className={classes.root}>
            <Paper elevation={5} className={classes.paper}>
                <Typography align="center" variant="h6" gutterBottom="true">TO DO LIST</Typography>
                <InputTask handleSubmit={handleSubmit} />
                <TaskList tasks={tasks} onClickAdd={handleToggleTask} onClickDeleted={deleteTask} />
            </Paper>
        </div>
    );
}