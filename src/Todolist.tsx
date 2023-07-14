import React, {ChangeEvent, RefObject} from 'react';
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
    onCheckedTitle:(tID:string, isDone: boolean)=> void
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

    const onChangeCheckedTitleHandler = (tID: string,e:ChangeEvent<HTMLInputElement> )=> {
        props.onCheckedTitle(tID, e.currentTarget.checked)
    }

    const mappedTasks = props.tasks.map(t => <li key={t.id}>
        <input onChange={(e)=>onChangeCheckedTitleHandler(t.id, e)} type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
    </li>)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input ref={props.titleTask}/>
            <Button name={'+'} callBack={addTaskHandler}/>
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
