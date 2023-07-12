import React, {useState} from 'react';
import './App.css';
import {Button} from "./components/Button";
import {Input} from "./components/Input";


export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    let [messages, setMessages] = useState([
        {message: 'message1'},
        {message: 'message2'},
        {message: 'message3'}
    ])

    const [title, setTitle] = useState('')

    const addMessage = () => {
        let newMessage = {message: title}
        setMessages([newMessage, ...messages])
    }


    const callBackHandler = () => {
        addMessage()
        setTitle('')
    }
    return (
        <div>
            <Input title={title} setTitle={setTitle}/>
            <Button name={'X'} callBack={callBackHandler}/>

            {messages.map((f, index) => {
                return (
                    <div key={index}>{f.message}</div>
                )
            })}
        </div>
    )

























    // let [tasks, setTasks] = useState([
    //     {id: 0, title: "HTML&CSS", isDone: true},
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS1", isDone: false},
    //     {id: 4, title: "ReactJS2", isDone: false},
    //     {id: 5, title: "ReactJS3", isDone: false},
    // ])
    //
    //
    // const removeTask = (id: number) => {
    //     setTasks(tasks.filter(el => el.id !== id))
    // }
    // // const ButtonFoo1 = (sub: string) => {
    // //     console.log(sub)
    // // }
    // // const ButtonFoo2 = (sub: string) => {
    // //     console.log(sub)
    // // }
    //
    // type carsType = {
    //     manufacturer: string
    //     model: string
    // }
    //
    // type moneyType = {
    //     banknots: string
    //     value: number
    //     number: string
    // }
    // type moneyType1 = Array<moneyType>
    //
    //
    // const [money, setMoney] = useState<moneyType1>([
    //     {banknots: 'Dollars', value: 100, number: ' a1234567890'},
    //     {banknots: 'Dollars', value: 50, number: ' z1234567890'},
    //     {banknots: 'RUBLS', value: 100, number: ' w1234567890'},
    //     {banknots: 'Dollars', value: 100, number: ' e1234567890'},
    //     {banknots: 'Dollars', value: 50, number: ' c1234567890'},
    //     {banknots: 'RUBLS', value: 100, number: ' r1234567890'},
    //     {banknots: 'Dollars', value: 50, number: ' x1234567890'},
    //     {banknots: 'RUBLS', value: 50, number: ' v1234567890'},
    // ])
    //
    // const filterMoneyDoll = () => {
    //     console.log(money.filter(f => f.banknots === 'Dollars').map(m => m.banknots))
    // }
    // const filterMoneyRub = () => {
    //
    // }
    //
    // const topCars = [
    //     {manufacturer: 'BMW', model: 'm5cs'},
    //     {manufacturer: 'Mercedes', model: 'e63s'}, {manufacturer: 'BMW', model: 'm5cs'},
    //     {manufacturer: 'Mercedes', model: 'e63s'}, {manufacturer: 'BMW', model: 'm5cs'},
    //     {manufacturer: 'Mercedes', model: 'e63s'}, {manufacturer: 'BMW', model: 'm5cs'},
    //     {manufacturer: 'Mercedes', model: 'e63s'}, {manufacturer: 'BMW', model: 'm5cs'},
    //     {manufacturer: 'Mercedes', model: 'e63s'}, {manufacturer: 'BMW', model: 'm5cs'},
    //     {manufacturer: 'Mercedes', model: 'e63s'}, {manufacturer: 'BMW', model: 'm5cs'},
    //     {manufacturer: 'Mercedes', model: 'e63s'},
    //     {manufacturer: 'Audi', model: 'rs6'}
    // ]
    //
    //
    // return (
    //
    //     <div className="App">
    //         <Button name={'DOLL'} callBack={filterMoneyDoll}/>
    //         <Button name={'RUB'} callBack={filterMoneyRub}/>
    //
    //         <ul>
    //             {topCars.map((m, index) => {
    //                 return (
    //                     <li key={index}>
    //                         {index+1}
    //                         {m.model}
    //                         {m.manufacturer}
    //                     </li>
    //                 )
    //             })}
    //         </ul>
    //
    //         <ul>
    //             {money.filter(f => f.banknots !== 'Dollars').map(m => <li key={m.number}>{m.banknots}{m.value}{m.number}</li>)}
    //
    //         </ul>
    //         <Todolist
    //             title="What to learn"
    //             tasks={tasks}
    //             removeTask={removeTask}
    //         />
    //     </div>
    // );
}

export default App;
