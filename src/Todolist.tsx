import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID: string
    deleteTodo: (todolistID: string) => void
    addTodolist: (title: string) => void
    editableSpanUpdateHandler: (todolistID: string, taskID: string, title: string) => void
    updateTitleTodolist: (todolistID: string, title: string)=>void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const deleteHandler = () => {
        props.deleteTodo(props.todolistID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const addTodolistHandler = (title: string) => {
        props.addTodolist(title)
    }


    const editableSpanUpdate = (taskID: string, title: string) => {
        props.editableSpanUpdateHandler(props.todolistID, taskID, title)
    }

    const updateTitleTodolistHandler = (title: string)=> {
        props.updateTitleTodolist(props.todolistID, title)
    }
    return <div>

        <AddItemForm callBack={addTodolistHandler}/>

        <button onClick={deleteHandler}>DELETE</button>
       <h3><EditableSpan title={props.title} callBack={updateTitleTodolistHandler}/></h3>
        <div>

            <AddItemForm callBack={addTaskHandler}/>

        </div>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callBack={(title)=>editableSpanUpdate(t.id, title)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
