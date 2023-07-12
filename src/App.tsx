import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {Button} from "./components/Button";


export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 0, title: "HTML&CSS", isDone: true},
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS1", isDone: false},
        {id: 4, title: "ReactJS2", isDone: false},
        {id: 5, title: "ReactJS3", isDone: false},
    ])


    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    // const ButtonFoo1 = (sub: string) => {
    //     console.log(sub)
    // }
    // const ButtonFoo2 = (sub: string) => {
    //     console.log(sub)
    // }
  const ButtonFoo3 = (value: string) => {
        console.log(value)
    }

    return (

        <div className="App">

            <Button name={'KEKL'} callBack={() => ButtonFoo3('jeka')}/>
            <Button name={'rrrfds'} callBack={() => ButtonFoo3('lexa')}/>
            {/*<Button name={'1'} callBack={ButtonFoo3}/>*/}

            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
