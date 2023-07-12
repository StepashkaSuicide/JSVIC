import React, {ChangeEvent, useState} from 'react';


type FullInputType = {
    addMessage: (title: string)=> void
}


export const FullInput = (props: FullInputType) => {


    const [title, setTitle] = useState('')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        props.addMessage(title)
        setTitle('')
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>x</button>
        </div>
    );
};

