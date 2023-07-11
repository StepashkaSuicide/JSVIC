import React, {useState} from 'react';
import {FilterType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void

}

export function Todolist(props: PropsType) {

    const [valueFilter, setValueFilter] = useState<FilterType>('All')
    const taskFilter = (value: FilterType) => {
        setValueFilter(value)
    }

    const completedFilterFoo = ()=> {
        let completedFilter = props.tasks

        switch (valueFilter) {
            case 'Active' : {
                return completedFilter = props.tasks.filter(el => !el.isDone)
            }
            case 'Completed': {
               return  completedFilter = props.tasks.filter(el => el.isDone)
            }
            default:
                return completedFilter
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {completedFilterFoo().map(el => {
                return (

                    <li key={el.id}>
                        <button onClick={() => {props.removeTask(el.id)}}>x</button>
                        <input onChange={() => {}} type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => {taskFilter('All')}}>All</button>
            <button onClick={() => {taskFilter('Active')}}>Active</button>
            <button onClick={() => {taskFilter('Completed')}}>Completed</button>
        </div>
    </div>
}
