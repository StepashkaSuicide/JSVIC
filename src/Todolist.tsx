import React, {RefObject} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    addTask: () => void
    title: string
    titleTask: RefObject<HTMLInputElement>
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

    const tsarChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const addTaskHandler = () => {
        props.addTask()
    }

    const mappedTasks = props.tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
    </li>)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input ref={props.titleTask}/>
            <Button name={'+'} callBack={addTaskHandler}/>
            {/*<button onClick={props.addTask}>+</button>*/}
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button name={'All'} callBack={() => tsarChangeFilter('all')}/>
            <Button name={'Active'} callBack={() => tsarChangeFilter('active')}/>
            <Button name={'Completed'} callBack={() => tsarChangeFilter('completed')}/>
        </div>
    </div>
}
