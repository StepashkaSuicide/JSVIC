import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (title: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)

    const updateAddTask = () => {
        props.callBack(title)
    }
    const editFoo = () => {
        setEdit(!edit)
        updateAddTask()
    }
    const onChangeEditableSpan = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        edit
            ? <input onChange={onChangeEditableSpan} autoFocus onBlur={editFoo} value={title}/>
            : <span onDoubleClick={editFoo}>{props.title}</span>
    )
}
