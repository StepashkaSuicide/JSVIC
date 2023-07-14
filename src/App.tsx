import React, {useRef, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);


    const titleTask = useRef<HTMLInputElement>(null)

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const addTask = () => {

        if (titleTask.current) {
            let newTask = {id: v1(), title: titleTask.current.value, isDone: true}
            setTasks([newTask, ...tasks])
            titleTask.current.value = ''
        }

    }
    const onCheckedTitle = (tID:string, isDone: boolean) => {
        setTasks(tasks.map(el=> el.id===tID ? {...el, isDone}: el))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      titleTask={titleTask}
                      tasks={tasksForTodolist}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      onCheckedTitle={onCheckedTitle}
            />
        </div>
    );
}

export default App;

