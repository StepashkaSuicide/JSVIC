import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ClearIcon from '@mui/icons-material/Clear';

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
    updateTitleTodolist: (todolistID: string, title: string) => void
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

    const updateTitleTodolistHandler = (title: string) => {
        props.updateTitleTodolist(props.todolistID, title)
    }


    // const buttonStyle = {
    //     maxWidth: '70px',
    //     maxHeight: '30px',
    //     margin: '2px',
    //     minHeight: '30px',
    //     minWidth: '30px',
    //
    // }
    return <div>
        <DeleteSweepIcon onClick={deleteHandler} fontSize={"large"}
                         style={{color: 'lightseagreen'}}>DELETE</DeleteSweepIcon>

        <AddItemForm callBack={addTodolistHandler}/>
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
                        <ClearIcon onClick={onClickHandler} style={{color: 'lightseagreen'}}>x</ClearIcon>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callBack={(title) => editableSpanUpdate(t.id, title)}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}

                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    onClick={onAllClickHandler} color='info'>all</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    onClick={onActiveClickHandler} color='secondary'>active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={onCompletedClickHandler} color='info'>completed</Button>

            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
