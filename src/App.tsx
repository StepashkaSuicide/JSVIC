import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string) {

        setTasks( tasks.filter(t=> t.id !== id));
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }


    const [todoLists, setTodoLists] = useState<todoListType[]>([
        {id: v1(), title: 'learn js', filter: 'all'},
        {id: v1(), title: ' js', filter: 'all'},
        {id: v1(), title: 'rs', filter: 'all'},

    ])

    function changeFilter(todolistID: string, value: FilterValuesType) {
       setTodoLists(todoLists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    return (
        <div className="App">
            {todoLists.map((el) => {
                    let tasksForTodolist = tasks;

                    if (el.filter === "active") {
                        tasksForTodolist = tasks.filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone);
                    }
                    return (
                        <Todolist title={el.title}
                                  todolistID={el.id}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={el.filter}

                        />
                    )
                }
            )}

        </div>
    );
}

export default App;
