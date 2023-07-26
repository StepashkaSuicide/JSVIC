import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todoListAPI} from "../api/todolist-api";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
   const todolistId = '07173f6f-a2da-48db-b166-56d170b2e039'

    useEffect(() => {
        const promise = tasksAPI.getTasks(todolistId)
        promise.then((res) => {
            setState(res.data)
            console.log(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}



export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACT111'
        const todolistId = '07173f6f-a2da-48db-b166-56d170b2e039'

        tasksAPI.createTasks(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '07173f6f-a2da-48db-b166-56d170b2e039'
        const taskId = '3aff2b73-17e6-46a5-ac3e-17cbcec03ccf'

        tasksAPI.deleteTasks(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '07173f6f-a2da-48db-b166-56d170b2e039'
        const taskId= '0d712411-af03-4c13-92e3-069709ff249c'
        const title = 'REDUXxX'

        tasksAPI.updateTasks(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

