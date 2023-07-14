import React, {ChangeEvent, RefObject, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import s from './components/Todolist.module.css'

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
    onCheckedTitle: (tID: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [error, setError]= useState<null | string>(null)
    const [buttonName, setButtonName] = useState('all')

    const tsarChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
        setButtonName(value)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const addTaskHandler = () => {
        if (props.titleTask.current?.value.trim()) {
            props.addTask()
        }else {
            setError('TITLE IS REQUIRED')
        }
    }

    const onChangeCheckedTitleHandler = (tID: string, e: ChangeEvent<HTMLInputElement>) => {
        props.onCheckedTitle(tID, e.currentTarget.checked)
    }

    const changeHandler = ()=> {
        setError(null)
    }

    const mappedTasks = props.tasks.map(t => <li key={t.id} className={t.isDone ? s.isDone: ''}>
        <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
        <input  onChange={(e) => onChangeCheckedTitleHandler(t.id, e)} type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>

    </li>)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={changeHandler} className={error ? s.error: ''} ref={props.titleTask}/>
          <Button name={'+'} callBack={addTaskHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <button className={buttonName === 'all'? s.activeFilter: ''} onClick={() => tsarChangeFilter('all')}>All</button>
            <button className={buttonName === 'active'? s.activeFilter: ''} onClick={() => tsarChangeFilter('active')}>Active</button>
            <button className={buttonName === 'completed'? s.activeFilter: ''} onClick={() => tsarChangeFilter('completed')}>Completed</button>
        </div>
    </div>
}
