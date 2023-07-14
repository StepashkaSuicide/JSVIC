import React from 'react';
import s from './Todolist.module.css'

type ButtonType = {
    name: string
    callBack: () => void

}

export const Button = (props:ButtonType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    // const buttonClassName =  `${props.buttonName==='active'? s.activeFilter: ''} `


    return (
        <button  onClick={onClickHandler}>{props.name}</button>
    );
};

